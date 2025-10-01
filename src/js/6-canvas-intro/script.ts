import { queryElement } from "../../helpers";

const canvas = queryElement<HTMLCanvasElement>(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const ctx = canvas.getContext("2d");
