function OpenModal(url, modalId) {
    $(modalId).load(url, function () {
        $(modalId).modal();
    })
};
