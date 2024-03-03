import * as universal from '../entries/pages/user/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/user/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/user/+page.js";
export const imports = ["_app/immutable/nodes/5.hirCoAcT.js","_app/immutable/chunks/index.R8ovVqwX.js","_app/immutable/chunks/scheduler.D9xsQs6S.js","_app/immutable/chunks/index.xraDlImX.js","_app/immutable/chunks/each.D6YF6ztN.js"];
export const stylesheets = [];
export const fonts = [];
