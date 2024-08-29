export function getRandomArbitrary(min:number, max:number) {
    return Math.random() * (max - min) + min;
}

export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));