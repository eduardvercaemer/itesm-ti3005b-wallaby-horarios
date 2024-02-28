import { createContextId, Signal } from "@builder.io/qwik";

export const DateContext = createContextId<Signal<Date | null>>("date");
