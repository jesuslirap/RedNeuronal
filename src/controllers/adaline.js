import { ScalarTensorProduct, ScalarTensorSum, GetMax, DotProduct, ScalarProduct, VectorSum, TensorSum, Mean, HadamartProduct } from './utilities';

const sigmoid = (y) => {
    return 1 / (1 + Math.exp(-y));
}

const linear = (y) => {
    return y
}

const activation = (f) => {
    return sigmoid;
}

export const classify = (haty) => {
    let classes = [];
    haty.forEach((obj, index) => {
        classes.push([]);
        obj.forEach(val => {
            classes[index].push(val > 0.5 ? 1 : 0);
        });
    });
    return classes;
}

export const forward = (x, w, f, y) => {
    let yHat = [];
    let a = [];
    let v = [];
    let e = [];

    x.forEach(element => {
        a = element;
        w.forEach(layer => {
            v = [];
            layer.forEach(neuron => {
                v.push(activation(f)(DotProduct([-1, ...a], neuron)));
            });
            a = v;
        });
        yHat.push(a);
    });
    yHat.forEach((obj, i) => {
        e.push(VectorSum(obj, ScalarProduct(-1, y[i])));
    })

    return { yHat, e };
}

const update = (w, r, e, x, haty) => {
    let deltaW;
    let delta = [];
    let error;
    let f;
    let df;

    w[w.length-1].forEach((neuron, neuron_index) => {
        deltaW = Array(neuron.length).fill(0);
        x.forEach((pattern, pattern_index) => {
            error = e[pattern_index][neuron_index];
            f = haty[pattern_index][neuron_index];
            df = f * (1 - f);
            deltaW = VectorSum(deltaW, ScalarProduct(error * df , [-1, ...pattern]));
        });
        deltaW = ScalarProduct(-2*r/x.length, deltaW);
        delta.push(deltaW);
    });
    return TensorSum(w, [delta]);
}

const getError = (e) => {
    let error = Array(e[0].length).fill(0);
    e.forEach(obj => {
        error = VectorSum(error, HadamartProduct(obj, obj));
    })
    return GetMax(ScalarProduct(1/e.length, error));
}

export const getAsserted = (y, haty) => {
    let out = [];
    let equals = true;
    y.forEach((obj, i) => {
        equals = true;
        for (let j = 0; j < obj.length && equals; j++) {
            equals = obj[j] === haty[i][j];
        }
        out.push(equals);
    });
    return out;
}

export const train = (x, y, w, r, epoch, err, f) => {
    let o;
    let e;
    let error = err + 1;
    let obj;
    let n;
    for (let i = 0; i < 100 && error > err; i++) {
        obj = forward(x, w, f, y);
        o = obj.yHat;
        e = obj.e;
        error = getError(e);
        w = update(w, r, e, x, o);
    }
    return w;
}