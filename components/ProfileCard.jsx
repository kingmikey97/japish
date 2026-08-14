"use client";

import { useEffect, useState } from "react";

import {
  Linkedin,
  Github,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Search,
  VideoIcon,
  PlaySquareIcon,
  MapPin,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { getTemplate, getLayoutComponent } from "@/lib/templates";
import { getColorOverride } from "@/lib/colorMap";

import LayoutBasic from "./profile-layouts/LayoutBasic";
import LayoutModern from "./profile-layouts/LayoutModern";
import LayoutProfessional from "./profile-layouts/LayoutProfessional";
import LayoutElegant from "./profile-layouts/LayoutElegant";
import LayoutPremium from "./profile-layouts/LayoutPremium";
import LayoutInfluencer from "./profile-layouts/LayoutInfluencer";

import EmbedVideo from "./EmbedVideo";

// ============================================
// QR DE DEMOSTRACIÓN
// ============================================

const QR_PAYMENT_IMAGE =
  "https://res.cloudinary.com/dhknj3d22/image/upload/v1784665954/Qr_pagos_Mikey_g4g1yt.jpg";

// ============================================
// PROFILE CARD
// ============================================

export default function ProfileCard({ username }) {
  // ============================================
  // ESTADOS GENERALES
  // ============================================

  const [profileData, setProfileData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [lightbox, setLightbox] = useState(null);

  // ============================================
  // ESTADOS DEL CHECKOUT DE DEMOSTRACIÓN
  // ============================================

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [checkoutStep, setCheckoutStep] = useState("details");

  // details
  // customer
  // payment
  // loading
  // success

  const [checkoutError, setCheckoutError] = useState("");

  const [buyerData, setBuyerData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryDate: "",
  });

  // ============================================
  // CARGAR PERFIL DESDE SUPABASE
  // ============================================

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);

        setError(null);

        const usernameActual = username || "mikey";

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", usernameActual)
          .single();

        // ============================================
        // ERROR SUPABASE
        // ============================================

        if (error) {
          if (error.code === "PGRST116" || error.message?.includes("0 rows")) {
            console.log(
              `Perfil "${usernameActual}" no encontrado en base de datos`,
            );

            setError(`El perfil "${usernameActual}" no existe.`);
          } else {
            console.error("Error de Supabase:", error);

            setError(
              error.message ||
                "Error al cargar el perfil. Por favor intenta de nuevo.",
            );
          }

          setLoading(false);

          return;
        }

        // ============================================
        // DATA NULL
        // ============================================

        if (!data) {
          console.log(`Perfil "${usernameActual}" no encontrado`);

          setError(`El perfil "${usernameActual}" no existe.`);

          setLoading(false);

          return;
        }

        // ============================================
        // REDES SOCIALES
        // ============================================

        if (data.social_links && Array.isArray(data.social_links)) {
          data.social_links = data.social_links.map((link) => {
            let icon;

            switch (link.type) {
              case "linkedin":
                icon = Linkedin;
                break;

              case "github":
                icon = Github;
                break;

              case "email":
                icon = Mail;
                break;

              case "website":
                icon = Globe;
                break;

              case "tiktok":
                icon = VideoIcon;
                break;

              case "youtube":
                icon = PlaySquareIcon;
                break;

              case "instagram":
                icon = Instagram;
                break;

              case "facebook":
                icon = Facebook;
                break;

              case "twitter":
                icon = Twitter;
                break;

              case "whatsapp":
                icon = MessageCircle;
                break;

              case "map-pin":
                icon = MapPin;
                break;

              default:
                icon = Globe;
            }

            return {
              ...link,
              icon,
            };
          });
        }

        setProfileData(data);

        setLoading(false);
      } catch (err) {
        console.error("Error inesperado al cargar perfil:", err);

        setError("Error de conexión. Verifica tu internet e intenta de nuevo.");

        setLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4" />

          <p className="text-xl">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR / PERFIL NO ENCONTRADO
  // ============================================

  if (error || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">🔍</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Perfil no encontrado
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              {error ||
                `El perfil "${username || "mikey"}" no existe en nuestra base de datos.`}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-lg font-bold text-white mb-3">
                Sugerencias:
              </h3>

              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>

                  <span>
                    Verifica que el username esté escrito correctamente
                  </span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>

                  <span>Prueba buscar en la landing de JAPISH</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">•</span>

                  <span>
                    Ejemplos válidos:{" "}
                    <code className="bg-white/10 px-2 py-1 rounded">mikey</code>
                    ,{" "}
                    <code className="bg-white/10 px-2 py-1 rounded">
                      demo-basico
                    </code>
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/japish"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
              >
                <Search size={20} />
                Buscar otro perfil
              </a>

              <a
                href="/"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20 flex items-center justify-center gap-2"
              >
                Ir al sitio web de ValhallaTechnology
              </a>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            ¿Necesitas ayuda?{" "}
            <a
              href="https://wa.me/59177777777"
              className="text-cyan-400 hover:underline"
            >
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // NORMALIZAR TEMPLATE
  // ============================================

  const templateId = Number(profileData.template_id);

  // Template especial
  const isSingani = templateId === 15;

  // ============================================
  // WHATSAPP
  // ============================================

  const handleWhatsApp = () => {
    const message = "Hola! Vi tu tarjeta digital y me gustaría conectar.";

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${profileData.whatsapp}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  // ============================================
  // TEMPLATE BASE
  // ============================================

  const baseTemplate = getTemplate(templateId);

  // ============================================
  // COLOR OVERRIDE 1 - 5
  // ============================================

  const colorOverride =
    templateId >= 1 && templateId <= 5
      ? getColorOverride(profileData.bg_color_id)
      : null;

  const template = colorOverride
    ? {
        ...baseTemplate,

        colors: {
          ...baseTemplate.colors,

          background: colorOverride.background,

          card: colorOverride.card,

          cardBorder: colorOverride.cardBorder,

          secondary: colorOverride.secondary,

          accent: colorOverride.accent,

          buttonPrimary: colorOverride.buttonPrimary,

          buttonSecondary: colorOverride.buttonSecondary,

          ringColor: colorOverride.ringColor,
        },
      }
    : baseTemplate;

  // ============================================
  // LAYOUT
  // ============================================

  let LayoutComponent = getLayoutComponent(templateId);

  if (!LayoutComponent) {
    LayoutComponent =
      {
        1: LayoutBasic,
        2: LayoutModern,
        3: LayoutProfessional,
        4: LayoutElegant,
        5: LayoutPremium,
        10: LayoutInfluencer,
      }[templateId] || LayoutModern;
  }

  // ============================================
  // PARSEAR SERVICES
  // ============================================

  let services = [];

  try {
    if (Array.isArray(profileData.services)) {
      services = profileData.services;
    } else if (
      typeof profileData.services === "string" &&
      profileData.services.trim()
    ) {
      const parsedServices = JSON.parse(profileData.services);

      services = Array.isArray(parsedServices) ? parsedServices : [];
    }
  } catch (err) {
    console.error("Error al procesar profileData.services:", err);

    services = [];
  }

  // ============================================
  // ACTUALIZAR DATOS DEL COMPRADOR
  // ============================================

  const updateBuyerData = (field, value) => {
    setBuyerData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (checkoutError) {
      setCheckoutError("");
    }
  };

  // ============================================
  // RESETEAR CHECKOUT
  // ============================================

  const resetCheckout = () => {
    setSelectedProduct(null);

    setQuantity(1);

    setCheckoutStep("details");

    setCheckoutError("");

    setBuyerData({
      name: "",
      phone: "",
      address: "",
      deliveryDate: "",
    });
  };

  // ============================================
  // SELECCIONAR PRODUCTO
  // ============================================

  const handleSelectProduct = (item) => {
    if (!isSingani) {
      return;
    }

    setSelectedProduct(item);

    setQuantity(1);

    setCheckoutStep("details");

    setCheckoutError("");

    setBuyerData({
      name: "",
      phone: "",
      address: "",
      deliveryDate: "",
    });
  };

  // ============================================
  // VALIDACIÓN DEL FORMULARIO
  // ============================================

  const validateBuyerData = () => {
    if (!buyerData.name.trim()) {
      setCheckoutError("Ingresa el nombre del contacto.");

      return false;
    }

    if (!buyerData.phone.trim()) {
      setCheckoutError("Ingresa un número de teléfono.");

      return false;
    }

    if (!buyerData.address.trim()) {
      setCheckoutError("Ingresa una dirección.");

      return false;
    }

    if (!buyerData.deliveryDate) {
      setCheckoutError("Selecciona una fecha.");

      return false;
    }

    setCheckoutError("");

    return true;
  };

  // ============================================
  // CONTINUAR AL QR
  // ============================================

  const handleContinueToPayment = () => {
    if (!validateBuyerData()) {
      return;
    }

    setCheckoutStep("payment");
  };

  // ============================================
  // TOTAL
  // ============================================

  const currentTotal = selectedProduct
    ? Number(selectedProduct.price || 0) * quantity
    : 0;

  // ============================================
  // RENDER
  // ============================================

  return (
    <>
      {/* ============================================ */}
      {/* FONDO */}
      {/* ============================================ */}

      <div className="fixed inset-0 -z-20 bg-slate-950" />

      <div
        className={`
          min-h-screen
          ${
            templateId >= 1 && templateId <= 5
              ? `bg-gradient-to-br ${template.colors.background}`
              : ""
          }
          p-4
          py-12
        `}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ============================================ */}
          {/* LAYOUT PRINCIPAL */}
          {/* ============================================ */}

          <LayoutComponent
            profileData={profileData}
            template={template}
            handleWhatsApp={handleWhatsApp}
          />

          {/* ============================================ */}
          {/* SERVICIOS */}
          {/* ============================================ */}

          {templateId <= 99 && services.length > 0 && (
            <>
              <div className="space-y-8 sm:space-y-12">
                {services.map((section, sectionIdx) => (
                  <div key={sectionIdx}>
                    {/* ============================================ */}
                    {/* TÍTULO DE SECCIÓN */}
                    {/* ============================================ */}

                    {section.title && (
                      <div className="text-center mb-6 sm:mb-8 px-2">
                        <h2
                          className={`
                                text-2xl
                                sm:text-3xl
                                md:text-4xl
                                font-bold
                                ${template.colors.primary}
                                mb-2
                                leading-tight
                              `}
                        >
                          {section.title}
                        </h2>

                        <div
                          className={`
                                w-16
                                sm:w-24
                                h-1
                                bg-gradient-to-r
                                ${template.colors.ringColor}
                                mx-auto
                                rounded-full
                              `}
                        />
                      </div>
                    )}

                    {/* ============================================ */}
                    {/* ITEMS GRID */}
                    {/* ============================================ */}

                    {Array.isArray(section.items) &&
                      section.layout === "grid" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                          {section.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className={`
                                      ${template.colors.card || ""}
                                      border
                                      ${template.colors.cardBorder}
                                      ${template.styles.cardRounded}
                                      overflow-hidden
                                      hover:bg-white/10
                                      transition-all
                                      flex
                                      flex-col
                                      justify-between
                                      group
                                      shadow-lg
                                    `}
                            >
                              {/* IMAGEN */}

                              <div className="relative aspect-[4/3] sm:h-48 bg-black/20 overflow-hidden">
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name || "Imagen"}
                                    className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-300"
                                    onClick={() => setLightbox(item.image)}
                                  />
                                )}

                                {Array.isArray(item.badges) &&
                                  item.badges.length > 0 && (
                                    <div className="absolute bottom-2 left-2 right-2 flex flex-wrap justify-center gap-1.5 px-1">
                                      {item.badges.map((badge, i) => (
                                        <span
                                          key={i}
                                          className="bg-black/75 backdrop-blur-md text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-md text-center leading-tight border border-white/10 shadow-sm"
                                        >
                                          {badge}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                {item.tag && (
                                  <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded shadow-md z-10">
                                    {item.tag}
                                  </span>
                                )}
                              </div>

                              {/* INFORMACIÓN */}

                              <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
                                <div>
                                  <h3
                                    className={`
                                            text-base
                                            sm:text-lg
                                            font-bold
                                            ${template.colors.primary}
                                            mb-1
                                            leading-snug
                                          `}
                                  >
                                    {item.name}
                                  </h3>

                                  {(item.description || item.Description) && (
                                    <p
                                      className={`
                                              text-xs
                                              sm:text-sm
                                              ${template.colors.secondary}
                                              opacity-85
                                              leading-relaxed
                                              line-clamp-2
                                            `}
                                    >
                                      {item.description || item.Description}
                                    </p>
                                  )}
                                </div>

                                {/* ============================================ */}
                                {/* PRECIO */}
                                {/* SOLO TEMPLATE 15 */}
                                {/* ============================================ */}

                                {isSingani && (
                                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                                    <div className="min-w-0 flex-1">
                                      {item.oldPrice && (
                                        <p className="text-[10px] sm:text-xs line-through opacity-50 truncate">
                                          BS.{" "}
                                          {Number(
                                            item.oldPrice,
                                          ).toLocaleString()}
                                        </p>
                                      )}

                                      <p
                                        className={`
                                                font-black
                                                text-base
                                                sm:text-lg
                                                ${template.colors.accent}
                                                truncate
                                              `}
                                      >
                                        BS.{" "}
                                        {Number(
                                          item.price || 0,
                                        ).toLocaleString()}
                                      </p>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => handleSelectProduct(item)}
                                      className={`
                                              px-3
                                              py-2
                                              sm:px-4
                                              rounded-lg
                                              bg-gradient-to-r
                                              ${template.colors.buttonPrimary}
                                              text-white
                                              font-bold
                                              text-xs
                                              sm:text-sm
                                              shadow-md
                                              hover:scale-105
                                              active:scale-95
                                              transition-all
                                              flex
                                              items-center
                                              gap-1.5
                                              shrink-0
                                            `}
                                    >
                                      🛒 Pedir
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                    {/* ============================================ */}
                    {/* MODO FILA / VIDEOS */}
                    {/* ============================================ */}

                    {Array.isArray(section.items) &&
                      section.layout !== "grid" && (
                        <div className="space-y-6 sm:space-y-8">
                          {section.items.map((item, itemIdx) => {
                            const isEven = itemIdx % 2 === 0;

                            return (
                              <div
                                key={itemIdx}
                                className={`
                                        ${template.colors.card || ""}
                                        border
                                        ${template.colors.cardBorder}
                                        ${template.styles.cardRounded}
                                        overflow-hidden
                                        hover:bg-white/10
                                        transition-all
                                        shadow-lg
                                      `}
                              >
                                <div
                                  className={`
                                          grid
                                          grid-cols-1
                                          md:grid-cols-2
                                          gap-0
                                          ${isEven ? "" : "md:grid-flow-dense"}
                                        `}
                                >
                                  {/* VIDEO / IMAGEN */}

                                  <div
                                    className={`
                                            relative
                                            aspect-video
                                            md:aspect-auto
                                            md:h-full
                                            ${
                                              isEven
                                                ? "md:col-start-1"
                                                : "md:col-start-2"
                                            }
                                          `}
                                  >
                                    {item.videoUrl ? (
                                      <div className="w-full h-full min-h-[200px]">
                                        <EmbedVideo
                                          url={item.videoUrl}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ) : (
                                      item.image && (
                                        <img
                                          src={item.image}
                                          alt={item.name || "Imagen"}
                                          className="w-full h-full object-cover cursor-zoom-in"
                                          onClick={() =>
                                            setLightbox(item.image)
                                          }
                                        />
                                      )
                                    )}

                                    {item.icon && (
                                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg">
                                        {item.icon}
                                      </div>
                                    )}
                                  </div>

                                  {/* INFORMACIÓN */}

                                  <div
                                    className={`
                                            p-4
                                            sm:p-6
                                            md:p-8
                                            flex
                                            flex-col
                                            justify-between
                                            ${
                                              isEven
                                                ? "md:col-start-2"
                                                : "md:col-start-1"
                                            }
                                          `}
                                  >
                                    <div>
                                      <h3
                                        className={`
                                                text-xl
                                                sm:text-2xl
                                                font-bold
                                                ${template.colors.primary}
                                                mb-2
                                                sm:mb-3
                                                leading-snug
                                              `}
                                      >
                                        {item.name}
                                      </h3>

                                      {(item.description ||
                                        item.Description) && (
                                        <p
                                          className={`
                                                  ${template.colors.secondary}
                                                  leading-relaxed
                                                  text-xs
                                                  sm:text-sm
                                                  mb-4
                                                  opacity-90
                                                `}
                                        >
                                          {item.description || item.Description}
                                        </p>
                                      )}
                                    </div>

                                    {/* PRECIO SOLO 15 */}

                                    {isSingani && (
                                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10 mt-2 sm:mt-4 gap-3">
                                        <div>
                                          {item.oldPrice && (
                                            <p className="text-[10px] sm:text-xs line-through opacity-50">
                                              BS.{" "}
                                              {Number(
                                                item.oldPrice,
                                              ).toLocaleString()}
                                            </p>
                                          )}

                                          <p
                                            className={`
                                                    text-xl
                                                    sm:text-2xl
                                                    font-black
                                                    ${template.colors.accent}
                                                  `}
                                          >
                                            BS.{" "}
                                            {Number(
                                              item.price || 0,
                                            ).toLocaleString()}
                                          </p>
                                        </div>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleSelectProduct(item)
                                          }
                                          className={`
                                                  px-4
                                                  py-2
                                                  sm:px-5
                                                  sm:py-2.5
                                                  rounded-xl
                                                  bg-gradient-to-r
                                                  ${template.colors.buttonPrimary}
                                                  text-white
                                                  font-bold
                                                  text-xs
                                                  sm:text-sm
                                                  shadow-md
                                                  hover:scale-105
                                                  active:scale-95
                                                  transition-all
                                                  flex
                                                  items-center
                                                  gap-2
                                                  shrink-0
                                                `}
                                        >
                                          🛒 Pedir
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </div>
                ))}
              </div>

              {/* ============================================ */}
              {/* MODAL */}
              {/* ============================================ */}

              {isSingani && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
                  <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl text-white">
                    {/* ============================================ */}
                    {/* CERRAR */}
                    {/* ============================================ */}

                    <button
                      type="button"
                      onClick={resetCheckout}
                      className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-all"
                    >
                      ✕
                    </button>

                    {/* ============================================ */}
                    {/* PASO 1 — CANTIDAD */}
                    {/* ============================================ */}

                    {checkoutStep === "details" && (
                      <div className="p-4 sm:p-6 space-y-5">
                        <div className="text-center pt-2">
                          <span className="inline-block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/50 px-3 py-1 rounded-full">
                            Demostración de pedido
                          </span>

                          <h3 className="text-lg sm:text-xl font-bold text-white mt-3 leading-snug">
                            {selectedProduct.name}
                          </h3>
                        </div>

                        {/* PRODUCTO */}

                        <div className="flex items-center gap-3 sm:gap-4 bg-zinc-800/70 p-3 rounded-2xl border border-zinc-700/50">
                          {selectedProduct.image && (
                            <img
                              src={selectedProduct.image}
                              alt={selectedProduct.name}
                              className="w-16 h-16 object-cover rounded-xl border border-white/10 shrink-0"
                            />
                          )}

                          <div className="min-w-0">
                            <p className="text-xs text-zinc-400">
                              Precio unitario
                            </p>

                            <p className="text-lg font-bold text-amber-400">
                              BS.{" "}
                              {Number(
                                selectedProduct.price || 0,
                              ).toLocaleString()}
                            </p>

                            {selectedProduct.oldPrice && (
                              <p className="text-xs text-zinc-500 line-through">
                                BS.{" "}
                                {Number(
                                  selectedProduct.oldPrice,
                                ).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* CANTIDAD */}

                        <div className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-2xl border border-zinc-700/40">
                          <div>
                            <p className="text-sm font-medium text-zinc-200">
                              Cantidad
                            </p>

                            <p className="text-[11px] text-zinc-500 mt-0.5">
                              Selecciona la cantidad
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                setQuantity(Math.max(1, quantity - 1))
                              }
                              className="w-9 h-9 rounded-xl bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-white font-bold active:scale-90 transition-all"
                            >
                              −
                            </button>

                            <span className="text-lg font-bold min-w-8 text-center">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() => setQuantity(quantity + 1)}
                              className="w-9 h-9 rounded-xl bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-white font-bold active:scale-90 transition-all"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* TOTAL */}

                        <div className="bg-gradient-to-r from-amber-950/30 to-zinc-800/40 border border-amber-900/30 rounded-2xl p-4 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-zinc-400">Total</p>

                            <p className="text-[11px] text-zinc-500">
                              {quantity} producto
                              {quantity !== 1 ? "s" : ""}
                            </p>
                          </div>

                          <p className="text-2xl font-black text-amber-400">
                            BS. {currentTotal.toLocaleString()}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setCheckoutStep("customer")}
                          className={`
                                w-full
                                py-3.5
                                rounded-2xl
                                bg-gradient-to-r
                                ${template.colors.buttonPrimary}
                                text-white
                                font-bold
                                text-sm
                                shadow-lg
                                hover:brightness-110
                                active:scale-[0.98]
                                transition-all
                              `}
                        >
                          Continuar con mis datos →
                        </button>
                      </div>
                    )}

                    {/* ============================================ */}
                    {/* PASO 2 — DATOS */}
                    {/* ============================================ */}

                    {checkoutStep === "customer" && (
                      <div className="p-4 sm:p-6 space-y-5">
                        <div className="pt-2">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-amber-400 font-semibold">
                            Paso 2 de 3
                          </p>

                          <h3 className="text-xl font-bold text-white mt-1">
                            Datos del contacto
                          </h3>

                          <p className="text-xs text-zinc-400 mt-1">
                            Completa la información del contacto.
                          </p>
                        </div>

                        {/* NOMBRE */}

                        <div>
                          <label className="block text-xs font-medium text-zinc-300 mb-2">
                            Nombre completo *
                          </label>

                          <input
                            type="text"
                            value={buyerData.name}
                            onChange={(e) =>
                              updateBuyerData("name", e.target.value)
                            }
                            placeholder="Ej. Juan Pérez"
                            autoComplete="name"
                            className="
                                  w-full
                                  bg-zinc-800/70
                                  border
                                  border-zinc-700
                                  focus:border-amber-500/70
                                  focus:ring-2
                                  focus:ring-amber-500/10
                                  outline-none
                                  rounded-xl
                                  px-4
                                  py-3.5
                                  text-sm
                                  text-white
                                  placeholder:text-zinc-600
                                  transition-all
                                "
                          />
                        </div>

                        {/* TELÉFONO */}

                        <div>
                          <label className="block text-xs font-medium text-zinc-300 mb-2">
                            Número de contacto *
                          </label>

                          <input
                            type="tel"
                            value={buyerData.phone}
                            onChange={(e) =>
                              updateBuyerData("phone", e.target.value)
                            }
                            placeholder="Ej. 71234567"
                            autoComplete="tel"
                            className="
                                  w-full
                                  bg-zinc-800/70
                                  border
                                  border-zinc-700
                                  focus:border-amber-500/70
                                  focus:ring-2
                                  focus:ring-amber-500/10
                                  outline-none
                                  rounded-xl
                                  px-4
                                  py-3.5
                                  text-sm
                                  text-white
                                  placeholder:text-zinc-600
                                  transition-all
                                "
                          />
                        </div>

                        {/* DIRECCIÓN */}

                        <div>
                          <label className="block text-xs font-medium text-zinc-300 mb-2">
                            Dirección *
                          </label>

                          <textarea
                            rows={3}
                            value={buyerData.address}
                            onChange={(e) =>
                              updateBuyerData("address", e.target.value)
                            }
                            placeholder="Ej. Av. Arce #1234, zona Sopocachi, La Paz"
                            autoComplete="street-address"
                            className="
                                  w-full
                                  resize-none
                                  bg-zinc-800/70
                                  border
                                  border-zinc-700
                                  focus:border-amber-500/70
                                  focus:ring-2
                                  focus:ring-amber-500/10
                                  outline-none
                                  rounded-xl
                                  px-4
                                  py-3.5
                                  text-sm
                                  text-white
                                  placeholder:text-zinc-600
                                  transition-all
                                "
                          />

                          <p className="text-[10px] text-zinc-500 mt-1.5">
                            Puedes incluir ciudad, zona y referencia.
                          </p>
                        </div>

                        {/* FECHA */}

                        <div>
                          <label className="block text-xs font-medium text-zinc-300 mb-2">
                            Fecha *
                          </label>

                          <input
                            type="date"
                            value={buyerData.deliveryDate}
                            onChange={(e) =>
                              updateBuyerData("deliveryDate", e.target.value)
                            }
                            className="
                                  w-full
                                  bg-zinc-800/70
                                  border
                                  border-zinc-700
                                  focus:border-amber-500/70
                                  focus:ring-2
                                  focus:ring-amber-500/10
                                  outline-none
                                  rounded-xl
                                  px-4
                                  py-3.5
                                  text-sm
                                  text-white
                                  transition-all
                                  [color-scheme:dark]
                                "
                          />
                        </div>

                        {/* MINI RESUMEN */}

                        <div className="bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-4">
                          <div className="flex justify-between items-center text-xs mb-2 gap-4">
                            <span className="text-zinc-400">Producto</span>

                            <span className="font-medium text-white text-right">
                              {selectedProduct.name}
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-xs mb-2">
                            <span className="text-zinc-400">Cantidad</span>

                            <span className="font-medium">{quantity}</span>
                          </div>

                          <div className="border-t border-zinc-700/70 mt-3 pt-3 flex justify-between items-center">
                            <span className="text-xs text-zinc-400">Total</span>

                            <span className="font-black text-amber-400 text-lg">
                              BS. {currentTotal.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* ERROR */}

                        {checkoutError && (
                          <div className="bg-red-950/40 border border-red-900/60 rounded-xl px-4 py-3">
                            <p className="text-xs text-red-300">
                              {checkoutError}
                            </p>
                          </div>
                        )}

                        {/* BOTONES */}

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setCheckoutError("");

                              setCheckoutStep("details");
                            }}
                            className="w-1/3 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-xs sm:text-sm font-semibold transition-all"
                          >
                            ← Atrás
                          </button>

                          <button
                            type="button"
                            onClick={handleContinueToPayment}
                            className={`
                                  flex-1
                                  py-3.5
                                  rounded-xl
                                  bg-gradient-to-r
                                  ${template.colors.buttonPrimary}
                                  text-white
                                  font-bold
                                  text-xs
                                  sm:text-sm
                                  hover:brightness-110
                                  active:scale-[0.98]
                                  transition-all
                                `}
                          >
                            Continuar al QR →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ============================================ */}
                    {/* PASO 3 — QR DEMO */}
                    {/* ============================================ */}

                    {checkoutStep === "payment" && (
                      <div className="p-4 sm:p-6 space-y-4 text-center">
                        <div className="pt-2">
                          <h3 className="text-lg font-bold text-white mt-3">
                            Escanea el QR
                          </h3>

                          <p className="text-xs text-zinc-400 mt-1">
                            Este paso es parte de la demostración visual.
                          </p>
                        </div>

                        {/* QR */}

                        <div className="bg-white p-3 rounded-2xl inline-block mx-auto shadow-inner border border-zinc-300 overflow-hidden">
                          <img
                            src={QR_PAYMENT_IMAGE}
                            alt="Código QR de demostración"
                            className="w-52 h-52 object-cover scale-157 translate-y-6.5 -translate-x-1 transition-transform"
                          />
                        </div>

                        {/* TOTAL */}

                        <div className="bg-zinc-800/80 p-4 rounded-xl border border-zinc-700">
                          <p className="text-xs text-zinc-400">Total</p>

                          <p className="text-2xl font-black text-amber-400 mt-1">
                            BS. {currentTotal.toLocaleString()}
                          </p>

                          <p className="text-[11px] text-zinc-500 mt-2">
                            {quantity} × {selectedProduct.name}
                          </p>
                        </div>

                        {/* DATOS BREVES */}

                        <div className="bg-zinc-800/40 border border-zinc-700/50 p-4 rounded-xl text-left">
                          <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
                            Contacto
                          </p>

                          <p className="text-sm font-semibold">
                            {buyerData.name}
                          </p>

                          <p className="text-xs text-zinc-400 mt-1">
                            {buyerData.phone}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setCheckoutStep("customer")}
                            className="w-1/3 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-semibold transition-all"
                          >
                            ← Atrás
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setCheckoutStep("loading");

                              setTimeout(() => {
                                setCheckoutStep("success");
                              }, 2000);
                            }}
                            className={`
                                  flex-1
                                  py-3
                                  sm:py-3.5
                                  rounded-xl
                                  bg-gradient-to-r
                                  ${template.colors.buttonPrimary}
                                  text-white
                                  font-bold
                                  text-xs
                                  sm:text-sm
                                  shadow-lg
                                  hover:brightness-110
                                  active:scale-[0.98]
                                  transition-all
                                `}
                          >
                            Confirmar Pago
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ============================================ */}
                    {/* LOADING */}
                    {/* ============================================ */}

                    {checkoutStep === "loading" && (
                      <div className="min-h-[380px] p-8 sm:p-12 flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />

                        <h4 className="text-lg font-bold text-white">
                          Procesando...
                        </h4>

                        <p className="text-xs text-zinc-400 max-w-xs">
                          Preparando el resumen de la demostración.
                        </p>
                      </div>
                    )}

                    {/* ============================================ */}
                    {/* SUCCESS */}
                    {/* ============================================ */}

                    {checkoutStep === "success" && (
                      <div className="p-5 sm:p-7 space-y-5">
                        {/* CABECERA */}

                        <div className="text-center pt-2">
                          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center text-emerald-400 text-3xl font-bold shadow-lg">
                            ✓
                          </div>

                          <h3 className="text-xl sm:text-2xl font-black text-white mt-4">
                            ¡Pago completado!
                          </h3>

                          <p className="text-xs text-zinc-400 mt-2">
                            Resumen de todos los datos ingresados.
                          </p>
                        </div>

                        {/* PRODUCTO */}

                        <div className="bg-zinc-800/60 border border-zinc-700/60 rounded-2xl overflow-hidden">
                          <div className="p-4 border-b border-zinc-700/60">
                            <p className="text-[10px] uppercase tracking-wider text-zinc-500">
                              Producto
                            </p>

                            <div className="flex items-center gap-3 mt-3">
                              {selectedProduct.image && (
                                <img
                                  src={selectedProduct.image}
                                  alt={selectedProduct.name}
                                  className="w-14 h-14 rounded-xl object-cover"
                                />
                              )}

                              <div>
                                <p className="font-bold text-white">
                                  {selectedProduct.name}
                                </p>

                                <p className="text-xs text-zinc-400 mt-1">
                                  BS.{" "}
                                  {Number(
                                    selectedProduct.price || 0,
                                  ).toLocaleString()}{" "}
                                  c/u
                                </p>
                              </div>
                            </div>
                          </div>

                          <SummaryRow label="Cantidad" value={`${quantity}`} />

                          <SummaryRow
                            label="Total"
                            value={`BS. ${currentTotal.toLocaleString()}`}
                            highlight
                            last
                          />
                        </div>

                        {/* DATOS */}

                        <div className="bg-zinc-800/60 border border-zinc-700/60 rounded-2xl overflow-hidden">
                          <div className="px-4 py-3 border-b border-zinc-700/60">
                            <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-500">
                              Datos del contacto
                            </p>
                          </div>

                          <SummaryRow label="Nombre" value={buyerData.name} />

                          <SummaryRow
                            label="Teléfono"
                            value={buyerData.phone}
                          />

                          <SummaryRow
                            label="Dirección"
                            value={buyerData.address}
                          />

                          <SummaryRow
                            label="Fecha"
                            value={buyerData.deliveryDate}
                            last
                          />
                        </div>

                        {/* CERRAR */}

                        <button
                          type="button"
                          onClick={resetCheckout}
                          className={`
                                w-full
                                py-3.5
                                rounded-xl
                                bg-gradient-to-r
                                ${template.colors.buttonPrimary}
                                text-white
                                font-bold
                                text-sm
                                hover:brightness-110
                                active:scale-[0.98]
                                transition-all
                              `}
                        >
                          Finalizar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ============================================ */}
          {/* FOOTER */}
          {/* ============================================ */}

          <div
            className={`
              text-center
              py-8
              border-t
              ${template.colors.cardBorder}
            `}
          >
            <p
              className={`
                text-xs
                ${template.colors.secondary}
                mb-2
              `}
            >
              Powered by
            </p>

            <a href="/japish" className="inline-block">
              <span
                className={`
                  ${template.colors.accent}
                  font-bold
                  text-lg
                  hover:opacity-80
                  transition
                `}
              >
                JAPISH
              </span>
            </a>

            <p
              className={`
                text-xs
                ${template.colors.secondary}
                mt-1
              `}
            >
              by ValhallaTechnology
            </p>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* LIGHTBOX */}
      {/* ============================================ */}

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="preview"
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            style={{
              animation: "fadeUp 0.2s ease both",
            }}
          />
        </div>
      )}
    </>
  );
}

// ============================================
// COMPONENTE PARA EL RESUMEN FINAL
// ============================================

function SummaryRow({ label, value, highlight = false, last = false }) {
  return (
    <div
      className={`
        px-4
        py-3
        flex
        items-start
        justify-between
        gap-4
        ${!last ? "border-b border-zinc-700/60" : ""}
      `}
    >
      <span className="text-xs text-zinc-500 shrink-0">{label}</span>

      <span
        className={`
          text-sm
          text-right
          break-words
          ${
            highlight
              ? "font-black text-amber-400"
              : "font-medium text-zinc-200"
          }
        `}
      >
        {value || "—"}
      </span>
    </div>
  );
}
