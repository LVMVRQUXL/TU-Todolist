class NumberUtil {
    /**
     * @param number {number}
     *
     * @returns {boolean}
     */
    isPositiveStrict(number) {
        return !isNaN(number) && number > 0;
    }

    /**
     * @param number {number}
     *
     * @returns {boolean}
     */
    isZero(number) {
        return !isNaN(number) && number === 0;
    }
}

module.exports = new NumberUtil();
