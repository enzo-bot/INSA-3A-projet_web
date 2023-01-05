import { getWord } from "../api.js";

export default function handler(request, response) {
    getWord(request, response);
};
  