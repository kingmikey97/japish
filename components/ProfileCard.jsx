"use client";

// ⚠️ Coloca aquí la URL de la imagen de tu código QR o método de pago
const QR_PAYMENT_IMAGE =
  "https://via.placeholder.com/300x300.png?text=ESCANEIA+AQUI+TU+QR";

// import { useState } from 'react';
import {
  Linkedin,
  Github,
  Mail,
  Phone,
  Globe,
  Video,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  MessageCircle,
  X,
  ExternalLink,
  Search,
  FileVideo,
  MonitorPlay,
  VideoIcon,
  ImagePlay,
  PlaySquareIcon,
  MapPin,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { getTemplate } from "@/lib/templates";
import { getColorOverride } from "@/lib/colorMap";
import LayoutBasic from "./profile-layouts/LayoutBasic";
import LayoutModern from "./profile-layouts/LayoutModern";
import LayoutProfessional from "./profile-layouts/LayoutProfessional";
import LayoutElegant from "./profile-layouts/LayoutElegant";
import LayoutPremium from "./profile-layouts/LayoutPremium";
import { getLayoutComponent } from "@/lib/templates";
import EmbedVideo from "./EmbedVideo";
import LayoutInfluencer from "./profile-layouts/LayoutInfluencer";

export default function ProfileCard({ username }) {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChatBubble, setShowChatBubble] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  // --- ESTADOS PARA LA COMPRA Y MODAL ---
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [checkoutStep, setCheckoutStep] = useState("details"); // 'details' | 'payment' | 'loading' | 'success'

  // ⚠️ Coloca aquí la URL de la imagen de tu código QR o método de pago
  const QR_PAYMENT_IMAGE =
    "https://res.cloudinary.com/dhknj3d22/image/upload/v1784665954/Qr_pagos_Mikey_g4g1yt.jpg";
  useEffect(() => {
    async function fetchProfile() {
      try {
        const usernameActual = username || "mikey";

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", usernameActual)
          .single();

        // ============================================
        // MANEJO MEJORADO DE ERRORES
        // ============================================
        if (error) {
          // Si el error es que no se encontró el registro
          if (error.code === "PGRST116" || error.message?.includes("0 rows")) {
            console.log(
              `Perfil "${usernameActual}" no encontrado en base de datos`,
            );
            setError(`El perfil "${usernameActual}" no existe.`);
          } else {
            // Otro tipo de error (conexión, permisos, etc)
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
        // VERIFICAR QUE DATA EXISTE
        // ============================================
        if (!data) {
          console.log(`Perfil "${usernameActual}" no encontrado (data null)`);
          setError(`El perfil "${usernameActual}" no existe.`);
          setLoading(false);
          return;
        }

        // ============================================
        // TRANSFORMAR DATOS
        // ============================================
        if (data.social_links) {
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
            return { ...link, icon };
          });
        }

        setProfileData(data);
        setLoading(false);
      } catch (err) {
        // Error inesperado (red, timeout, etc)
        console.error("Error inesperado al cargar perfil:", err);
        setError("Error de conexión. Verifica tu internet e intenta de nuevo.");
        setLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-xl">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
        <div className="max-w-2xl w-full">
          {/* Error card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12 text-center">
            {/* Icon */}
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">🔍</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Perfil no encontrado
            </h1>

            {/* Message */}
            <p className="text-xl text-gray-300 mb-8">
              {error ||
                `El perfil "${username || "mikey"}" no existe en nuestra base de datos.`}
            </p>

            {/* Suggestions */}
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

            {/* Actions */}
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
                Ir al sitio web de ValhallaTechnology?
              </a>
            </div>
          </div>

          {/* Help text */}
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

  const handleWhatsApp = () => {
    const message = "Hola! Vi tu tarjeta digital y me gustaría conectar.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${profileData.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // ============================================
  // CARGAR TEMPLATE
  // ============================================
  const baseTemplate = getTemplate(profileData.template_id);

  // Si el perfil es template 1-5 y tiene bg_color_id, sobreescribimos
  // fondo, botón principal y accent — el resto del template queda igual
  const colorOverride =
    profileData.template_id <= 5
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

  // Primero intentar obtener layout personalizado (templates 100+)
  let LayoutComponent = getLayoutComponent(profileData.template_id);

  // Si no hay layout personalizado, usar los layouts básicos (1-5)
  if (!LayoutComponent) {
    LayoutComponent =
      {
        1: LayoutBasic,
        2: LayoutModern,
        3: LayoutProfessional,
        4: LayoutElegant,
        5: LayoutPremium,
        10: LayoutInfluencer,
      }[profileData.template_id] || LayoutModern;
  }

  return (
    <>
      <div className="fixed inset-0 -z-20 bg-slate-950" />
      <div
        className={`min-h-screen ${profileData.template_id <= 5 ? `bg-gradient-to-br ${template.colors.background}` : ""} p-4 py-12`}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Renderizar layout específico */}
          <LayoutComponent
            profileData={profileData}
            template={template}
            handleWhatsApp={handleWhatsApp}
          />

          {/* APARTADOS DE SERVICIOS - Solo para templates 1-5 */}
          {profileData.template_id <= 99 &&
            profileData.services &&
            (typeof profileData.services === "string"
              ? JSON.parse(profileData.services)
              : profileData.services
            ).length > 0 && (
              <>
                <div className="space-y-8 sm:space-y-12">
                  {(typeof profileData.services === "string"
                    ? JSON.parse(profileData.services)
                    : profileData.services
                  ).map((section, sectionIdx) => (
                    <div key={sectionIdx}>
                      {/* Título de sección */}
                      {section.title && (
                        <div className="text-center mb-6 sm:mb-8 px-2">
                          <h2
                            className={`text-2xl sm:text-3xl md:text-4xl font-bold ${template.colors.primary} mb-2 leading-tight`}
                          >
                            {section.title}
                          </h2>
                          <div
                            className={`w-16 sm:w-24 h-1 bg-gradient-to-r ${template.colors.ringColor} mx-auto rounded-full`}
                          ></div>
                        </div>
                      )}

                      {/* Items de la sección - MODO GRID */}
                      {section.items &&
                        Array.isArray(section.items) &&
                        section.layout === "grid" && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {section.items.map((item, itemIdx) => (
                              <div
                                key={itemIdx}
                                className={`${template.colors.card} border ${template.colors.cardBorder} ${template.styles.cardRounded} overflow-hidden hover:bg-white/10 transition-all flex flex-col justify-between group shadow-lg`}
                              >
                                {/* Contenedor de Imagen */}
                                <div className="relative aspect-[4/3] sm:h-48 bg-black/20 overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-300"
                                    onClick={() =>
                                      setLightbox && setLightbox(item.image)
                                    }
                                  />
                                  {item.badges && item.badges.length > 0 && (
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

                                {/* Información del Producto */}
                                <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-3">
                                  <div>
                                    <h3
                                      className={`text-base sm:text-lg font-bold ${template.colors.primary} mb-1 leading-snug`}
                                    >
                                      {item.name}
                                    </h3>
                                    {(item.description || item.Description) && (
                                      <p
                                        className={`text-xs sm:text-sm ${template.colors.secondary} opacity-85 leading-relaxed line-clamp-2`}
                                      >
                                        {item.description || item.Description}
                                      </p>
                                    )}
                                  </div>

                                  {/* Precio y Botón */}
                                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 mt-auto">
                                    <div className="min-w-0 flex-1">
                                      {item.oldPrice && (
                                        <p className="text-[10px] sm:text-xs line-through opacity-50 truncate">
                                          BS. {item.oldPrice.toLocaleString()}
                                        </p>
                                      )}
                                      <p
                                        className={`font-black text-base sm:text-lg ${template.colors.accent} truncate`}
                                      >
                                        BS. {(item.price || 0).toLocaleString()}
                                      </p>
                                    </div>

                                    <button
                                      onClick={() => {
                                        setSelectedProduct(item);
                                        setQuantity(1);
                                        setCheckoutStep("details");
                                      }}
                                      className={`px-3 py-2 sm:px-4 rounded-lg bg-gradient-to-r ${template.colors.buttonPrimary} text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shrink-0`}
                                    >
                                      🛒 Pedir
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                      {/* Items en modo fila (LAYOUT NO GRID) */}
                      {section.items &&
                        Array.isArray(section.items) &&
                        section.layout !== "grid" && (
                          <div className="space-y-6 sm:space-y-8">
                            {section.items.map((item, itemIdx) => {
                              const isEven = itemIdx % 2 === 0;

                              return (
                                <div
                                  key={itemIdx}
                                  className={`${template.colors.card} border ${template.colors.cardBorder} ${template.styles.cardRounded} overflow-hidden hover:bg-white/10 transition-all shadow-lg`}
                                >
                                  <div
                                    className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${isEven ? "" : "md:grid-flow-dense"}`}
                                  >
                                    <div
                                      className={`relative aspect-video md:aspect-auto md:h-full ${isEven ? "md:col-start-1" : "md:col-start-2"}`}
                                    >
                                      {/* Si tiene videoUrl, mostrar video; si no, mostrar imagen */}
                                      {item.videoUrl ? (
                                        <div className="w-full h-full min-h-[200px]">
                                          <EmbedVideo
                                            url={item.videoUrl}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      ) : (
                                        <img
                                          src={item.image}
                                          alt={item.name}
                                          className="w-full h-full object-cover cursor-zoom-in"
                                          onClick={() =>
                                            setLightbox &&
                                            setLightbox(item.image)
                                          }
                                        />
                                      )}
                                      {item.icon && (
                                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg">
                                          {item.icon}
                                        </div>
                                      )}
                                    </div>

                                    <div
                                      className={`p-4 sm:p-6 md:p-8 flex flex-col justify-between ${isEven ? "md:col-start-2" : "md:col-start-1"}`}
                                    >
                                      <div>
                                        <h3
                                          className={`text-xl sm:text-2xl font-bold ${template.colors.primary} mb-2 sm:mb-3 leading-snug`}
                                        >
                                          {item.name}
                                        </h3>
                                        <p
                                          className={`${template.colors.secondary} leading-relaxed text-xs sm:text-sm mb-4 opacity-90`}
                                        >
                                          {item.description || item.Description}
                                        </p>
                                      </div>

                                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/10 mt-2 sm:mt-4 gap-3">
                                        <div>
                                          {item.oldPrice && (
                                            <p className="text-[10px] sm:text-xs line-through opacity-50">
                                              BS.{" "}
                                              {item.oldPrice.toLocaleString()}
                                            </p>
                                          )}
                                          <p
                                            className={`text-xl sm:text-2xl font-black ${template.colors.accent}`}
                                          >
                                            BS.{" "}
                                            {(item.price || 0).toLocaleString()}
                                          </p>
                                        </div>

                                        <button
                                          onClick={() => {
                                            setSelectedProduct(item);
                                            setQuantity(1);
                                            setCheckoutStep("details");
                                          }}
                                          className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r ${template.colors.buttonPrimary} text-white font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shrink-0`}
                                        >
                                          🛒 Comprar Ahora
                                        </button>
                                      </div>
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

                {/* ==================================================== */}
                {/* VENTANA MODAL FLOTANTE DE COMPRA Y PAGO              */}
                {/* ==================================================== */}
                {selectedProduct && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
                    <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto bg-zinc-900 border border-zinc-700/80 rounded-3xl shadow-2xl text-white">
                      {/* Botón de cerrar (X) */}
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-all"
                      >
                        ✕
                      </button>

                      {/* PASO 1: DETALLES DEL PRODUCTO, PRECIO Y CANTIDAD */}
                      {checkoutStep === "details" && (
                        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                          <div className="text-center pt-2">
                            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/50 px-3 py-1 rounded-full">
                              Resumen del Pedido
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold text-white mt-3 leading-snug">
                              {selectedProduct.name}
                            </h3>
                          </div>

                          <div className="flex items-center gap-3 sm:gap-4 bg-zinc-800/70 p-3 rounded-2xl border border-zinc-700/50">
                            <img
                              src={selectedProduct.image}
                              alt={selectedProduct.name}
                              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border border-white/10 shrink-0"
                            />
                            <div>
                              <p className="text-xs text-zinc-400">
                                Precio Unitario
                              </p>
                              <p className="text-base sm:text-lg font-bold text-amber-400">
                                BS.{" "}
                                {(selectedProduct.price || 0).toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {/* Contador de Cantidad */}
                          <div className="flex items-center justify-between bg-zinc-800/50 p-3.5 sm:p-4 rounded-2xl border border-zinc-700/40">
                            <span className="text-xs sm:text-sm font-medium text-zinc-300">
                              Cantidad:
                            </span>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  setQuantity(Math.max(1, quantity - 1))
                                }
                                className="w-8 h-8 rounded-lg bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-white font-bold active:scale-90 transition-all"
                              >
                                -
                              </button>
                              <span className="text-base sm:text-lg font-bold w-6 text-center">
                                {quantity}
                              </span>
                              <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-8 h-8 rounded-lg bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-white font-bold active:scale-90 transition-all"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Total calculado */}
                          <div className="flex justify-between items-center px-1 pt-1 border-t border-zinc-800">
                            <span className="text-xs sm:text-sm text-zinc-400">
                              Total a Pagar:
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-amber-400">
                              BS.{" "}
                              {(
                                (selectedProduct.price || 0) * quantity
                              ).toLocaleString()}
                            </span>
                          </div>

                          <button
                            onClick={() => setCheckoutStep("payment")}
                            className={`w-full py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r ${template.colors.buttonPrimary} text-white font-bold text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-[0.98] transition-all`}
                          >
                            Continuar al Pago →
                          </button>
                        </div>
                      )}

                      {/* PASO 2: QR DE PAGO */}
                      {checkoutStep === "payment" && (
                        <div className="p-4 sm:p-6 space-y-4 text-center">
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            Escanea el QR de Pago
                          </h3>
                          <p className="text-xs text-zinc-400">
                            Realiza la transferencia por el monto total
                            indicado:
                          </p>

                          {/* Contenedor e Imagen QR (VALORES EXACTOS MANTENIDOS) */}
                          <div className="bg-white p-3 rounded-2xl inline-block mx-auto shadow-inner border border-zinc-300 overflow-hidden">
                            <img
                              src={QR_PAYMENT_IMAGE}
                              alt="Código QR de Pago"
                              className="w-52 h-52 object-cover scale-157 translate-y-6.5 -translate-x-1 transition-transform"
                            />
                          </div>

                          <div className="bg-zinc-800/80 p-3 rounded-xl border border-zinc-700">
                            <p className="text-xs text-zinc-400">
                              Precio Total Aprobado:
                            </p>
                            <p className="text-xl sm:text-2xl font-black text-amber-400">
                              BS.{" "}
                              {(
                                (selectedProduct.price || 0) * quantity
                              ).toLocaleString()}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setCheckoutStep("loading");
                              setTimeout(() => {
                                setCheckoutStep("success");
                              }, 2500);
                            }}
                            className={`w-full py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r ${template.colors.buttonPrimary} text-white font-bold text-xs sm:text-sm shadow-lg hover:brightness-110 active:scale-[0.98] transition-all`}
                          >
                            Confirmar Pago
                          </button>
                        </div>
                      )}

                      {/* PASO 3: ANIMACIÓN DE CARGA (LOADING) */}
                      {checkoutStep === "loading" && (
                        <div className="p-8 sm:p-12 flex flex-col items-center justify-center space-y-4 text-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
                          <h4 className="text-base sm:text-lg font-bold text-white">
                            Procesando pago...
                          </h4>
                          <p className="text-xs text-zinc-400">
                            Por favor espera un momento mientras confirmamos la
                            transacción.
                          </p>
                        </div>
                      )}

                      {/* PASO 4: PAGO CONFIRMADO */}
                      {checkoutStep === "success" && (
                        <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-4">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 text-2xl sm:text-3xl font-bold shadow-lg">
                            ✓
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-white">
                            ¡Pago Confirmado!
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                            Tu compra de{" "}
                            <span className="font-bold text-white">
                              {quantity}x {selectedProduct.name}
                            </span>{" "}
                            por un total de{" "}
                            <span className="font-bold text-amber-400">
                              BS.{" "}
                              {(
                                (selectedProduct.price || 0) * quantity
                              ).toLocaleString()}
                            </span>{" "}
                            ha sido verificada con éxito.
                          </p>

                          <button
                            onClick={() => setSelectedProduct(null)}
                            className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs sm:text-sm transition-all mt-2"
                          >
                            Aceptar y Cerrar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

          {/* FOOTER */}
          <div
            className={`text-center py-8 border-t ${template.colors.cardBorder}`}
          >
            <p className={`text-xs ${template.colors.secondary} mb-2`}>
              Powered by
            </p>
            <a href="/japish" className="inline-block">
              <span
                className={`${template.colors.accent} font-bold text-lg hover:opacity-80 transition`}
              >
                JAPISH
              </span>
            </a>
            <p className={`text-xs ${template.colors.secondary} mt-1`}>
              by ValhallaTechnology
            </p>
          </div>
        </div>

        {/* FLOATING CHAT BUTTON */}
        <div className="fixed bottom-6 right-6 z-50">
          {/* 
          {showChatBubble && (
            <div className="absolute bottom-20 right-0 mb-2 animate-bounce">
              <div className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-xs">
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45"></div>

                <div className="relative z-10">
                  <button
                    onClick={() => setShowChatBubble(false)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                  >
                    <X size={14} className="text-gray-600" />
                  </button>

                  <p className="text-slate-900 font-semibold mb-2">
                    ¿Quieres tu propia tarjeta?
                  </p>
                </div>
              </div>
            </div>
          )} */}

          {/* <a
            href="/japish"
            className={`group w-16 h-16 bg-gradient-to-br ${template.colors.buttonPrimary} rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all hover:shadow-cyan-500/50 border-4 border-white`}
          >
            <span className="text-white text-2xl font-bold">si</span>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
          </a> */}
        </div>
      </div>
      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="preview"
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            style={{ animation: "fadeUp 0.2s ease both" }}
          />
        </div>
      )}
    </>
  );
}
