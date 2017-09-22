import math from 'mathjs';

// main
const resize = ctx => {
  const doc = ctx.document;
  const sel = ctx.api().selectedDocument.selectedLayers;

  if (sel.isEmpty) {
    doc.showMessage('No layer(s) selected!');
  } else {
    iterate(doc, sel, getDimensions());
  }
};

// open panel and get new dimensions
const getDimensions = () => {
  const alert = COSAlertWindow.new();
  alert.setMessageText('Resize Element(s)');
  alert.setInformativeText('Enter new width / height. Leave an empty field to skip the dimension. Resize is unconstrained.');

  alert.addTextLabelWithValue('Width');
  alert.addTextFieldWithValue('');
  const wFld = alert.viewAtIndex(1);

  alert.addTextLabelWithValue('Height');
  alert.addTextFieldWithValue('');
  const hFld = alert.viewAtIndex(3);

  alert.addButtonWithTitle('Resize');
  alert.addButtonWithTitle('Cancel');

  alert.alert().window().setInitialFirstResponder(wFld);
  wFld.setNextKeyView(hFld);
  hFld.setNextKeyView(wFld);

  alert.runModal();

  return {
    width: math.eval(cast('string', wFld.stringValue())),
    height: math.eval(cast('string', hFld.stringValue()))
  };
};

// iterate and resize selected layers
const iterate = (doc, sel, dim) => {
  sel.iterate((layer) => {
    const f = layer.sketchObject.frame();
    log(f.width());
    f.setRect_(NSMakeRect(f.x(), f.y(), dim.width || f.width(), dim.height || f.height()));
  });

  doc.reloadInspector();
};

// force type casting on returned input field garbage
const cast = (typevar, data) => {
  return {
    string: String.bind(null, data),
    number: Number.bind(null, data)
  }[typeof typevar]();
};

export default resize;
