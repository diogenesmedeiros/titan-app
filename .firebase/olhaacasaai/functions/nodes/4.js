import * as universal from '../entries/pages/signup/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/signup/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/signup/+page.js";
export const imports = ["_app/immutable/nodes/4.Z0hwJ-Ri.js","_app/immutable/chunks/index.R8ovVqwX.js","_app/immutable/chunks/scheduler.D9xsQs6S.js","_app/immutable/chunks/index.xraDlImX.js"];
export const stylesheets = [];
export const fonts = [];
