import { getElementError } from '@testing-library/dom';
import { DotProduct, ScalarProduct, VectorSum, TensorSum, Mean, GetMeans, AbsVector } from './utilities';

const step = (y) => {
    return y > 0 ? 1 : 0;
}

const activation = (f) => {
    switch (f) {
        case 0:
            return step;
    
        default:
            return step;
    }
}

export const classify = (haty) => {
    return haty;
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
                v.push(activation(f)(DotProduct([1, ...a], neuron)));
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

const update = (w, r, e, x) => {
    let deltaW = Array(w[0][0].length).fill(0);
    e.forEach((val, i) => {
        deltaW = VectorSum(deltaW, ScalarProduct(val[0], [1, ...x[i]]));
    });
    deltaW = ScalarProduct(-r/x.length, deltaW)
    return TensorSum(w, [[deltaW]]);
}

const getError = (e) => {
    let n = e.length;
    let m = e[0].length;
    let error = Array(m).fill(0);
    e.forEach(obj => {
        error = VectorSum(error, obj);
    })
    return Math.abs(Mean(ScalarProduct(1/n, e)));
}

export const train = (x, y, w, r, epoch, err, f, renderUpdate) => {
    let o;
    let e;
    let error = err + 1;
    let n = x.length;
    let obj;
    for (let i = 0; i < epoch && error > err; i++) {
        obj = forward(x, w, f, y);
        o = obj.yHat;
        e = obj.e;
        console.log(e)
        error = getError(e);
        console.log(error);
        w = update(w, r, e, x);
    }
    return w;
}