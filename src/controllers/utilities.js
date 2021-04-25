import { Random } from 'random-js';

const random = new Random();

export const binToInt = (b) => {
    let int = 0;
    let n = b.length;
    for (let i = 0; i < n; i++) {
        int += b[n - i - 1] * 2 ** i;
    }
    return int;
}

export const DotProduct = (x, w) => {
    let result = 0;
    x.forEach((item, index) => {
        result += item * w[index];
    });
    return result;
}

export const GetMinMaxDomain = (x) => {
    let n = x[0].length;
    let power = 0;
    let min = Array(n).fill(- (10 ** power));
    let max = Array(n).fill(10 ** power);

    x.forEach(val => {
        for (let i = 0; i < n; i++) {
            power = 0;
            while (10 ** power < Math.abs(val[i])) {
                power++;
            }
            min[i] = - (10 ** power);
            max[i] = 10 ** power;
        }
    });

    return {min, max};
}

export const GetMaxIndex = (x) => {
    let max = 0;
    for (let i = 1; i < x.length; i++) {
        if (x[i] > x[max]) {
            max = i;
        }
    }
    return max;
}

export const GetRandomVector = (n, min, max) => {
    let u = [];
    for (let i = 0; i < n; i++) {
        u.push(random.real(min, max, true));
    }
    return u;
}

export const equals = (x, y) => {
    for (let i = 0; i < x.length; i++) {
        if (x[i] != y[i]) {
            return false;
        }
    }
    return true;
}

let colors = {
    red: "#ff0000",
    green: "#00ff00",
    blue: "#0000ff",
    purple: "ff00ff",
    yellow: "#00ffff",
    black: "#000000",
};

export const getColor = (index) => {
    return Object.values(colors)[index];
}

export const toColor = (num) => {
    num >>>= 0;
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16
    return rgbToHex(r,g,b)
}

const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }


export const GetRandomWeights = (arch, min, max) => {
    let u = [];
    let aux;
    for (let i = 1; i < arch.length; i++) {
        aux = [];
        for (let j = 0; j < arch[i]; j++) {
            aux.push(GetRandomVector(arch[i-1] + 1, min, max));
        }
        u.push(aux);
    }
    return u;
}

export const GetRandomBias = (arch, min, max) => {
    let u = [];
    let aux;
    for (let i = 1; i < arch.length; i++) {
        aux = [];
        for (let j = 0; j < arch[i]; j++) {
            aux.push(GetRandomVector(arch[i-1] + 1, min, max));
        }
        u.push(aux);
    }
    return u;
}

export const Normalize = (method, args) => {
    // eslint-disable-next-line default-case
    switch (method) {
        case 0:
            return NormalizeDecimalScaling(args);
        case 1:
            return NormalizeMinMax(args);
        case 2:
            return NormalizeZScore(args);
    }
}

export const NormalizeDecimalScaling = ({x, n}) => {
    let u = [];
    let aux;
    let max = Array(n).fill(1);
    x.forEach(item => {
        item.forEach((value, index) => {
            while (Math.abs(value / max[index]) > 1) {
                max[index] *= 10;
            }
        });
    });
    x.forEach(item => {
        aux =  []
        item.forEach((value, index) => {
            aux.push(value / max[index]);
        })
        u.push(aux);
    });
    return u;
}

export const NormalizeMinMax = ({x, n, newMin, newMax}) => {
    let u = [];
    let aux;
    let min = Array(n);
    let max = Array(n);
    for (let i = 0; i < n; i++) {
        min[i] = x[0][i];
        max[i] = x[0][i];
    }
    x.forEach(item => {
        item.forEach((value, index) => {
            if (value < min[index]) {
                min[index] = value;
            }
            if (value > max[index]) {
                max[index] = value;
            }
        });
    });
    x.forEach(item => {
        aux =  []
        item.forEach((value, index) => {
            aux.push(((value - min[index]) / (max[index] - min[index])) * (newMax - newMin) + newMin);
        })
        u.push(aux);
    });
    return u;
}

export const NormalizeZScore = ({x, n}) => {
    let u = [];
    let aux;
    let size = x.length;
    let mean = GetMeans(x, size, n);
    let s = GetStandardDeviations(x, mean, size, n);
    x.forEach(item => {
        aux =  []
        item.forEach((value, index) => {
            aux.push((value - mean[index]) / s[index]);
        })
        u.push(aux);
    });
    return u;
}

export const GetMeans = (x, size, n) => {
    let u = Array(n).fill(0);
    x.forEach(item => {
        item.forEach((value, index) => {
            u[index] += value;
        });
    });
    for (let i = 0; i < n; i++) {
        u[i] /= size;
    }
    return u;
}

export const GetStandardDeviations = (x, mean, size, n) => {
    let u = Array(n).fill(0);
    x.forEach(item => {
        item.forEach((value, index) => {
            u[index] += (value - mean[index]) ** 2;
        });
    });
    for (let i = 0; i < n; i++) {
        u[i] = Math.sqrt(u[i] / (size - 1));
    }
    return u;
}

export const ScalarProduct = (x, u) => {
    let out = [];
    u.forEach(val => {
        out.push(x * val);
    });
    return out;
}

export const GetMax = (x) => {
    let max = x[0];
    x.forEach(e => {
        if (e > max) {
            max = e;
        }
    });
    return max;
}

export const VectorSum = (u, v) => {
    let out = [];
    u.forEach((val, i) => {
        out.push(val + v[i]);
    });
    return out;
}

export const Mean = (x) => {
    let mean = 0;
    x.forEach(val => {
        mean += val;
    })
    return mean / x.length;
}

export const AbsVector = (u) => {
    let abs = [];
    u.forEach(val => {
        abs.push(Math.abs(val));
    })
    return abs;
}

export const TensorSum = (U, V) => {
    let S = []
    if (Array.isArray(U)) {
        U.forEach((val, i) => {
            S.push(TensorSum(val, V[i]))
        })
        return S;
    } else {
        return U + V;
    }
}

export const HadamartProduct = (U, V) => {
    let S = []
    if (Array.isArray(U)) {
        U.forEach((val, i) => {
            S.push(HadamartProduct(val, V[i]))
        })
        return S;
    } else {
        return U * V;
    }
}

export const ScalarTensorProduct = (U, x) => {
    let S = []
    if (Array.isArray(U)) {
        U.forEach(val => {
            S.push(HadamartProduct(val, x))
        })
        return S;
    } else {
        return U * x;
    }
}

export const ScalarTensorSum = (U, x) => {
    let S = []
    if (Array.isArray(U)) {
        U.forEach(val => {
            S.push(HadamartProduct(val, x))
        })
        return S;
    } else {
        return U + x;
    }
}