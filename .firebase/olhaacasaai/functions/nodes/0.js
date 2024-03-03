

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.TdPtJZLc.js","_app/immutable/chunks/scheduler.D9xsQs6S.js","_app/immutable/chunks/index.xraDlImX.js"];
export const stylesheets = [];
export const fonts = [];
