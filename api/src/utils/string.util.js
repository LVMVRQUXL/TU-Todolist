class StringUtil {
    /**
     * @param string
     *
     * @returns {boolean}
     */
    isEmpty(string) {
        return !string || string === '';
    }
}

module.exports = new StringUtil();