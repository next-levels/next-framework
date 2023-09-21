"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
var Result = /** @class */ (function () {
    function Result(isSuccess, error, value) {
        if (isSuccess && error) {
            throw new Error("InvalidOperation: A result cannot be\n        successful and contain an error");
        }
        if (!isSuccess && !error) {
            throw new Error("InvalidOperation: A failing result\n        needs to contain an error message");
        }
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        this._value = value;
        Object.freeze(this);
    }
    Result.ok = function (value) {
        return new Result(true, null, value);
    };
    Result.fail = function (error) {
        return new Result(false, error);
    };
    Result.combine = function (results) {
        for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
            var result = results_1[_i];
            if (result.isFailure) {
                return result;
            }
        }
        return Result.ok();
    };
    Result.prototype.getValue = function () {
        if (!this.isSuccess) {
            throw new Error("Cant retrieve the value from a failed result.");
        }
        return this._value;
    };
    return Result;
}());
exports.Result = Result;
