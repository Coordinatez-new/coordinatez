"use client";

import Script from "next/script";
import { useConsent } from "@/lib/consent";

// Every integration here is doubly opt-in.
// 1. It only renders if its NEXT_PUBLIC_* env var is set (see .env.example), so nothing
//    loads until a real ID is configured — no placeholder/fake tracking IDs ever ship.
// 2. Nothing renders until the visitor ACCEPTS in the cookie banner. Analytics and
//    advertising tags are non-essential, and the privacy policy (section 4) promises they
//    are never requested before consent — Meta's Business Tools terms and Google's EU user
//    consent policy require the same. Declining, ignoring the banner, or sending a Global
//    Privacy Control signal all leave this component rendering nothing.
export function AnalyticsScripts() {
  const consent = useConsent();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const linkedInPartnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

  if (consent !== "accepted") return null;

  return (
    <>
      {(gaId || googleAdsId) && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId ?? googleAdsId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${gaId ? `gtag('config', '${gaId}');` : ""}
              ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
            `}
          </Script>
        </>
      )}

      {gtmId && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}

      {clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}

      {metaPixelId && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {linkedInPartnerId && (
        <Script id="linkedin-insight-init" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${linkedInPartnerId}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l){if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>
      )}
    </>
  );
}
