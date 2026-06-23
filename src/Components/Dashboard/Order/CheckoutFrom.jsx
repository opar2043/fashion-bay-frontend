/* ===================== EMAIL HELPERS (Forge Frame Clothing) ===================== */

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxios from "../../Hooks/useAxios";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
const DELIVERY_FEE = 2.99;
// formats the order email body
function buildOrderEmailMessage({ order, items }) {
  const now = new Date().toLocaleString();

  const itemsBlock =
    items && items.length
      ? items
          .map((it, idx) => {
            const quantity = Number(it.quantity) || 1;
            const unitPrice = Number(it.price) || 0;
            const lineTotal = unitPrice * quantity;
            const size = it.size ? ` | Size: ${it.size}` : "";
            const color = it.color ? ` | Color: ${it.color}` : "";

            return `${idx + 1}. ${it.name}${size}${color} — ${quantity} x £${unitPrice.toFixed(
              2
            )} = £${lineTotal.toFixed(2)}`;
          })
          .join("\n")
      : "No items";

  return `
🧾 NEW ORDER — Forge Frame Clothing

👤 CUSTOMER
Name: ${order.userName || "N/A"}
Email: ${order.userEmail || "N/A"}
Phone: ${order.phone || "N/A"}

📍 SHIPPING ADDRESS
City: ${order.city || "N/A"}
Address: ${order.address || "N/A"}

🛒 ITEMS
${itemsBlock}

💳 PAYMENT
Subtotal: £${Number(order.subtotal || 0).toFixed(2)}
Total: £${Number(order.total).toFixed(2)}
Transaction ID: ${order.transactionId || "N/A"}
Status: ${order.status || "pending"}

📅 Placed On: ${now}

──────────────────────────────
🧵 This email was sent via Forge Frame Clothing — Checkout.
  `.trim();
}

// returns a Web3Forms request payload
function buildWeb3FormsBody({ message, customerEmail, customerName }) {
  return {
    access_key: "46618204-1151-490c-8adc-91c3e15924bb",
    from_name: "Forge Frame Clothing — Order",
    subject: `New Order - ${customerName || customerEmail || "Customer"}`,
    message,
    replyto: customerEmail || "noreply@forgeframe.com",
    emails: `, ${customerEmail || ""}`.trim(),
  };
}

async function sendOrderEmail(web3Body) {
  const resp = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(web3Body),
  });
  return resp.json();
}

/* ===================== COMPONENT ===================== */

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();
  const [cart, refetch] = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [err, setErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  // Form states
  const [name, setName] = useState(user?.displayName || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  // Calculate subtotal
  const subtotal = useMemo(() => {
    if (!cart || cart.length === 0) return 0;
    return cart.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;
      return total + price * qty;
    }, 0);
  }, [cart]);

  const total = subtotal +  DELIVERY_FEE; // total = subtotal

  // Create payment intent
  useEffect(() => {
    if (total > 0) {
      axiosSecure.post("/create-payment-intent", { total }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, total]);

  // Clear cart
  const clearCart = async () => {
    try {
      const response = await axiosSecure.delete(`/cart`);
      if (response.data.deletedCount > 0) {
        refetch();
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to clear cart!", "error");
    }
  };

  // Handle payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErr("");

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErr(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

    if (confirmError) {
      setErr(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      const orderData = {
        userEmail: user?.email,
        userName: name,
        phone,
        city,
        address,
        subtotal,
        total,
        items: cart.map((item) => ({
          productId: item.productId || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          size: item.size,
          color: item.color,
          image: item.image,
        })),
        transactionId: paymentIntent.id,
        status: "confirmed",
        date: new Date().toISOString(),
      };

      const message = buildOrderEmailMessage({
        order: orderData,
        items: orderData.items,
      });

      const web3formsBody = buildWeb3FormsBody({
        message,
        customerEmail: orderData.userEmail,
        customerName: orderData.userName,
      });

      try {
        const [mailResult, saveResult] = await Promise.allSettled([
          sendOrderEmail(web3formsBody),
          axiosSecure.post("/order", orderData),
        ]);

        const mailOk =
          mailResult.status === "fulfilled" &&
          mailResult.value &&
          mailResult.value.success;

        const saveOk =
          saveResult.status === "fulfilled" &&
          (saveResult.value?.status === 200 ||
            saveResult.value?.status === 201 ||
            saveResult.value?.data?.insertedId);

        if (saveOk) await clearCart();

        if (mailOk && saveOk) {
          navigate("/confirm");
          Swal.fire({
            title: "Payment successful",
            text: "Your order is saved and a receipt email has been sent.",
            icon: "success",
            confirmButtonColor: "#111827",
          });
        } else if (saveOk && !mailOk) {
          navigate("/confirm");
          Swal.fire({
            title: "Order saved, email failed",
            text: "We placed your order but couldn't send the email copy.",
            icon: "info",
          });
        } else {
          Swal.fire("Error", "Submission failed!", "error");
        }
      } catch (err) {
        Swal.fire(
          "Error",
          "Payment succeeded but something else failed!",
          "error"
        );
      }
    }

    setProcessing(false);
  };

  /* ===================== UI ===================== */

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="tracking-[0.25em] text-xs uppercase text-gray-500">
            Forge &amp; Frame
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-wide text-gray-900">
            Checkout
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] p-6 sm:p-10">
            
            {/* LEFT */}
            <div className="space-y-8">
              <section>
                <h2 className="text-xs font-semibold uppercase text-gray-500 mb-4">
                  Contact information
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-white border rounded px-4 py-3 text-sm"
                  />

                  <input
                    type="email"
                    // value={user?.email || ""}
                    placeholder="Enter Email.."
                    className="w-full border rounded px-4 py-3 text-sm bg-white"
                  />

                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-white border rounded px-4 py-3 text-sm"
                  />
                </div>
              </section>

              <section>
                <h2 className="text-xs font-semibold uppercase text-gray-500 mb-4">
                  Shipping address
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full bg-white border rounded px-4 py-3 text-sm"
                  />

                  <textarea
                    placeholder="Street address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows={3}
                    className="w-full bg-white border rounded px-4 py-3 text-sm"
                  />
                </div>
              </section>

              <section>
                <h2 className="text-xs font-semibold uppercase text-gray-500 mb-4">
                  Payment details
                </h2>
                <div className="border rounded px-4 py-3 bg-white">
                  <CardElement />
                </div>
              </section>

              {err && (
                <p className="text-red-600 text-sm bg-red-50 border p-3 rounded">
                  {err}
                </p>
              )}
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <aside className="bg-slate-50 rounded border px-4 py-5 sm:px-6 sm:py-6 flex flex-col gap-4">
              <h2 className="text-xs font-semibold uppercase text-gray-600">
                Order summary
              </h2>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart?.map((item) => {
                  const qty = Number(item.quantity) || 1;
                  const lineTotal = qty * Number(item.price);

                  return (
                    <div key={item._id} className="flex gap-3 items-center">
                      <div className="h-14 w-14 rounded overflow-hidden bg-slate-200">
                        <img src={item.image} alt="" className="h-full w-full object-cover" />
                      </div>

                      <div className="flex-1 text-sm">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Size: {item.size || "N/A"} · Color: {item.color || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {qty} × £{Number(item.price).toFixed(2)}
                        </p>
                      </div>

                      <p className="font-semibold">
                        £{lineTotal.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee </span>
                  <span>£{DELIVERY_FEE.toFixed(2)}</span>
                </div>

                {/* TAX REMOVED */}

                <div className="flex justify-between text-base font-semibold text-gray-900 pt-3 border-t">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>

                <p className="text-xs text-gray-500">
                  Free shipping on orders over £89.
                </p>
              </div>

              <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className={`mt-2 w-full py-3.5 rounded-full text-sm font-semibold uppercase ${
                  !stripe || !clientSecret || processing
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-neutral-900"
                }`}
              >
                {processing ? "Processing..." : `Pay £${total.toFixed(2)} now`}
              </button>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
