"use client";

import { useMemo, useState } from "react";

// Configure your target price
const PRICE_ID = "price_1S2fcZ06JrOmKRCmTwbmGNxm";

export default function BuyPage() {
  const [useAltAcct, setUseAltAcct] = useState(false); // uses STRIPE_SECRET_KEY_ALT when true
  const [allowPromo, setAllowPromo] = useState(true); // show promo field on Checkout by default
  const [promoId, setPromoId] = useState(""); // promo_... (Promotion Code ID)
  const [couponId, setCouponId] = useState(""); // cou_... (Coupon ID)
  const [code, setCode] = useState(""); // human-readable code like FREE100
  const [ghlTag, setGhlTag] = useState(""); // optional GHL tag to apply

  const link = useMemo(() => {
    const params = new URLSearchParams();
    if (useAltAcct) params.set("acct", "alt");
    if (ghlTag.trim()) params.set("ghlTag", ghlTag.trim());
    const hasAutoDiscount = !!(promoId.trim() || couponId.trim() || code.trim());
    if (!hasAutoDiscount && allowPromo) params.set("allowPromo", "1");
    if (promoId.trim()) params.set("promo", promoId.trim());
    else if (couponId.trim()) params.set("coupon", couponId.trim());
    else if (code.trim()) params.set("code", code.trim());
    return `/buy/${PRICE_ID}?${params.toString()}`;
  }, [useAltAcct, allowPromo, promoId, couponId, code, ghlTag]);

  return (
    <div style={{ padding: 32, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Buy</h1>
      <p style={{ textAlign: "center" }}>Click below to open Stripe Checkout.</p>

      <div style={{ display: "grid", gap: 12, margin: "20px 0" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={useAltAcct}
            onChange={(e) => setUseAltAcct(e.target.checked)}
          />
          Use alternate Stripe account (acct=alt)
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={allowPromo}
            onChange={(e) => setAllowPromo(e.target.checked)}
          />
          Allow entering promotion code on Checkout
        </label>

        <div style={{ display: "grid", gap: 8 }}>
          <label>
            GHL Tag to apply (optional)
            <input
              type="text"
              placeholder="e.g., purchase-my-product"
              value={ghlTag}
              onChange={(e) => setGhlTag(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
          <label>
            Promotion Code ID (promo_...)
            <input
              type="text"
              placeholder="promo_..."
              value={promoId}
              onChange={(e) => setPromoId(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
          <label>
            Coupon ID (cou_...) — used only if no promo_ provided
            <input
              type="text"
              placeholder="cou_..."
              value={couponId}
              onChange={(e) => setCouponId(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
          <label>
            Code (what customers type, e.g., FREE100) — used only if no promo_/cou_ provided
            <input
              type="text"
              placeholder="FREE100"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />
          </label>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <a
          href={link}
          style={{
            display: "inline-block",
            padding: "12px 20px",
            fontSize: 16,
            backgroundColor: "#635BFF",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            minWidth: 180,
            textDecoration: "none",
          }}
        >
          Buy Now
        </a>
        <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
          Using price: <code>{PRICE_ID}</code>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#666", wordBreak: "break-all" }}>
          Link → <code>{link}</code>
        </div>
      </div>
    </div>
  );
}
