

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.Dk-p2_3d.js","_app/immutable/chunks/scheduler.D9xsQs6S.js","_app/immutable/chunks/index.xraDlImX.js","_app/immutable/chunks/entry.C_GHMSiJ.js"];
export const stylesheets = [];
export const fonts = [];
