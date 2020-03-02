function confirmeDelete(event, form) {
    event.preventDefault();
    let decision = confirm("Você Quer mesmo deletar esse arquivo?");
    if (decision) {
        form.submit();
    }
};
//conf tiny
tinymce.init({
    language: "pt_BR",
    selector: "#article",
    plugins: ["advlist autolink image link list print preview hr searchreplace wordcount insertdatetime media save table paste emoticons"]
});