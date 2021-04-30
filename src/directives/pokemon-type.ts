import { DirectiveBinding, Directive } from 'vue'

const onBeforeMounted = (el: HTMLInputElement, binding: DirectiveBinding) => {
    let classList="block rounded border-2 text-sm mx-1 px-1 ";
    console.log(binding);
    switch(binding.value){
        case "normal":
            el.setAttribute("class", classList.concat("bg-gray-200 border-gray-300 text-black"));
            break;
        case "fighting":
            el.setAttribute("class", classList.concat("bg-yellow-700 border-yellow-800 text-white"));
            break;
        case "flying":
            el.setAttribute("class", classList.concat("bg-indigo-300 border-indigo-400 text-black"));
            break;
        case "poison":
            el.setAttribute("class", classList.concat("bg-purple-800 border-purple-900 text-white"));
            break;
        case "ground":
            el.setAttribute("class", classList.concat("bg-yellow-500 border-yellow-600 text-white"));
            break;
        case "rock":
            el.setAttribute("class", classList.concat("bg-yellow-300 border-yellow-400 text-white"));
            break;
        case "bug":
            el.setAttribute("class", classList.concat("bg-green-700 border-green-800 text-white"));
            break;
        case "ghost":
            el.setAttribute("class", classList.concat("bg-indigo-800 border-indigo-900 text-white"));
            break;
        case "steel":
            el.setAttribute("class", classList.concat("bg-gray-200 border-gray-300 text-black"));
            break;
        case "fire":
            el.setAttribute("class", classList.concat("bg-red-600 border-red-700 text-white"));
            break;
        case "water":
            el.setAttribute("class", classList.concat("bg-blue-600 border-blue-700 text-white"));
            break;
        case "grass":
            el.setAttribute("class", classList.concat("bg-green-400 border-green-500 text-white"));
            break;
        case "electric":
            el.setAttribute("class", classList.concat("bg-yellow-400 border-yellow-500 text-white"));
            break;
        case "psychic":
            el.setAttribute("class", classList.concat("bg-pink-600 border-pink-700 text-white"));
            break;
        case "ice":
            el.setAttribute("class", classList.concat("bg-blue-300 border-blue-400 text-white"));
            break;
        case "dragon":
            el.setAttribute("class", classList.concat("bg-purple-600 border-purple-700 text-white"));
            break;
        case "dark":
            el.setAttribute("class", classList.concat("bg-gray-600 border-gray-700 text-white"));
            break;
        case "fairy":
            el.setAttribute("class", classList.concat("bg-pink-200 border-pink-300 text-white"));
            break;
        case "shadow":
        case "unknown":
        default:
            el.setAttribute("class", classList.concat("bg-white border-gray-700 text-black"));
            break;
    }
        el.style.background = binding.value
}


export const PokemonType: Directive = {
  beforeMount: onBeforeMounted,
}