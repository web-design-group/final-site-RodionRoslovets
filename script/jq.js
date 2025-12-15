$(document).ready(() => {
  catalogSortEl();
});

const catalogSortEl = () => {
  const sortElem = $(".catalog-sort");

  if (!sortElem.length) return;

  sortElem.find(".catalog-sort__top").on("click", (e) => {
    e.stopPropagation();
    sortElem.find(".catalog-sort__list").addClass("catalog-sort__list--active");
  });

  sortElem.find(".catalog-sort__list-btn").each((i, btn) => {
    $(btn).on("click", () => {
      const sortType = btn.dataset.sort;

      sortElem
        .find(".catalog-sort__list")
        .removeClass("catalog-sort__list--active");

      const newText = sortType === "popular" ? "По популярности" : "По цене";
      sortElem.find(".catalog-sort__top").text(newText);

      sortElem
        .find(".catalog-sort__list")
        .toggleClass("catalog-sort__list--reverse", sortType === "price");
    });
  });

  $(document).on("click", (e) => {
    if (!$(e.target).closest(".catalog-sort").length) {
      sortElem
        .find(".catalog-sort__list")
        .removeClass("catalog-sort__list--active");
    }
  });
};
