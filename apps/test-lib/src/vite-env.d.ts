/// <reference types="vite/client" />

// Swiper CSS module declarations (needed for tsc -b resolution with pnpm isolation)
declare module 'swiper/css' {
  const content: string;
  export default content;
}
declare module 'swiper/css/navigation' {
  const content: string;
  export default content;
}
declare module 'swiper/css/pagination' {
  const content: string;
  export default content;
}
declare module 'swiper/css/scrollbar' {
  const content: string;
  export default content;
}
declare module 'swiper/css/effect-fade' {
  const content: string;
  export default content;
}
declare module 'swiper/css/effect-coverflow' {
  const content: string;
  export default content;
}
