import * as universal from '../entries/pages/signin/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/signin/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/signin/+page.js";
export const imports = ["_app/immutable/nodes/3.ITuMU6H_.js","_app/immutable/chunks/index.R8ovVqwX.js","_app/immutable/chunks/scheduler.D9xsQs6S.js","_app/immutable/chunks/index.xraDlImX.js"];
export const stylesheets = [];
export const fonts = [];
