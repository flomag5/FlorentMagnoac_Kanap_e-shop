function confirmation() {
    const confirmationPage = window.location.href;
    const orderConfirm = new URL(confirmationPage);
    const getResponseId = orderConfirm.searchParams.get("id");

    document.querySelector("#orderId").innerText = getResponseId;
    localStorage.clear();
}
confirmation()