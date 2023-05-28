const canvas = document.getElementById('canvas');
const color_picker = document.getElementById('color-picker');

const canvas_ctx = canvas.getContext('2d');
const picker_ctx = color_picker.getContext('2d');

const square_size = Math.min(color_picker.width, color_picker.height) / 4;

let selected_color = [];

color_picker.addEventListener('click', (event) => {
  console.log('EVENT: ', event);
  const x = event.offsetX;
  const y = event.offsetY;

  const color = picker_ctx.getImageData(x, y, 1, 1).data;
  const color_string = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  console.log('COLOR STRING: ', color_string);
  canvas_ctx.fillStyle = color_string;
  canvas_ctx.fillRect(0, 0, canvas.width, canvas.height);

  // find the color-picker square that matches the color clicked and add a border to it
  // If the color is already selected, remove the border
  if(selected_color.length) {
    const selected_color_x = Math.floor(selected_color[0] / square_size) * square_size;
    const selected_color_y = Math.floor(selected_color[1] / square_size) * square_size;
    picker_ctx.clearRect(selected_color_x, selected_color_y, square_size, square_size);
    picker_ctx.fillStyle = selected_color[2];
    picker_ctx.fillRect(selected_color_x, selected_color_y, square_size, square_size);
    selected_color = [];
  } else {
    selected_color = [x, y, color_string];
    const square_x = Math.floor(x / square_size) * square_size;
    const square_y = Math.floor(y / square_size) * square_size;
    picker_ctx.strokeStyle = 'white';
    picker_ctx.lineWidth = 2;
    picker_ctx.strokeRect(square_x, square_y, square_size, square_size);
  }
});

const draw_color_picker = () => {
  picker_ctx.fillStyle = 'gray';
  picker_ctx.fillRect(0, 0, color_picker.width, color_picker.height);


  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 4; j++) {
      picker_ctx.fillStyle = `rgb(${i*64}, ${j*64}, ${(i+j)*32})`;
      // Fill the gray rectangle with 16 different colors
      const square_x = i * square_size;
      const square_y = j * square_size;

      picker_ctx.fillRect(square_x, square_y, square_size, square_size);
    }
  }
};

draw_color_picker();

