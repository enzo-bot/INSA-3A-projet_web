import { getDicos } from "../api.js";

export default function handler(request, response) {
    getDicos(request, response);
};
  