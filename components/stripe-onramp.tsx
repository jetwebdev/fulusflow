"use client";

import React from "react";
import { loadStripeOnramp } from "@stripe/crypto";

const stripeOnrampPromise = loadStripeOnramp(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CryptoElementsContext = React.createContext<{ onramp: any | null }>({
  onramp: null,
});

export function CryptoElements({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ctx, setContext] = React.useState<{ onramp: any | null }>({
    onramp: null,
  });

  React.useEffect(() => {
    let isMounted = true;

    Promise.resolve(stripeOnrampPromise).then((onramp) => {
      if (onramp && isMounted) {
        setContext({ onramp });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <CryptoElementsContext.Provider value={ctx}>
      {children}
    </CryptoElementsContext.Provider>
  );
}

function useStripeOnramp() {
  const context = React.useContext(CryptoElementsContext);
  return context.onramp;
}

export function OnrampElement({
  clientSecret,
  theme,
  onSessionUpdate,
}: {
  clientSecret: string;
  theme: "dark" | "light";
  onSessionUpdate?: (payload: unknown) => void;
}) {
  const stripeOnramp = useStripeOnramp();
  const onrampElementRef = React.useRef<HTMLDivElement | null>(null);
  const sessionRef = React.useRef<any | null>(null);

  React.useEffect(() => {
    const containerRef = onrampElementRef.current;
    if (!containerRef) return;

    containerRef.innerHTML = "";

    if (clientSecret && stripeOnramp) {
      const session = stripeOnramp.createSession({
        clientSecret,
        appearance: {
          theme,
        },
      });

      session.addEventListener("onramp_session_updated", (event: any) => {
        onSessionUpdate?.(event.payload);
      });

      session.mount(containerRef);
      sessionRef.current = session;
    }
  }, [clientSecret, stripeOnramp, theme, onSessionUpdate]);

  React.useEffect(() => {
    if (sessionRef.current?.setAppearance) {
      sessionRef.current.setAppearance({ theme });
    }
  }, [theme]);

  return <div id="onramp-element" ref={onrampElementRef} />;
}