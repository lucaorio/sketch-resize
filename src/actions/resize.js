import sketch from 'sketch';

// resize logic
const resize = (selection, dimensions) => {
  for (let layer of selection.layers) {
    const frame = layer.frame;
    const finalDimensions = process(dimensions, frame.width, frame.height);
    frame.width = finalDimensions.width;
    frame.height = finalDimensions.height;
  }

  sketch.UI.message(`Resized ${selection.length} layer(s)`);
};

// process dimensions, and replace %w, and %h
const process = (dimensions, originalWidth, originalHeight) => ({
  width: eval(sanitize(dimensions.width, originalWidth, originalHeight)),
  height: eval(sanitize(dimensions.height, originalWidth, originalHeight)),
});

const sanitize = (string, w, h) => string.replace(/%w/gi, w).replace(/%h/gi, h);

export default resize;
