import React, { useEffect } from "react";
import "./selectProduct.css";
import { useAddProduct } from "../useAddProduct";

const SelectProductModal = ({
  onClose,
  handleAddProduct,
  setTempSelectedProd,
  tempSelectedProd,
}) => {
  const {
    productList,
    Scroll,
    handleOnChangeSearch,
    handleGetProduct,
    pagination,
    searchValue,
    debounceSearch,
    handleOnClickProduct,
    handleOnClickVariant,
  } = useAddProduct();

  useEffect(() => {
    handleGetProduct(pagination.page, pagination.limit, debounceSearch);
  }, [debounceSearch]);

  return (
    <div className={`modal-background`}>
      <div className="modal-wrapper">
        <div className="modal-header">
          <h6 className="modal-title">Select Products</h6>
          <button onClick={onClose} className="modal-close">
            ×
          </button>
        </div>

        <div className="search-box">
          <input
            placeholder="Search product"
            className="search-input"
            onChange={handleOnChangeSearch}
            value={searchValue}
          />
        </div>

        <div className="products-container" onScroll={Scroll}>
          {productList?.map((item) => (
            <ProductItem
              key={item.id}
              data={item}
              handleOnClickProduct={handleOnClickProduct}
              handleOnClickVariant={handleOnClickVariant}
              isSelectedProduct={tempSelectedProd.find(
                (prod) => prod.id === item.id
              )}
              setTempSelectedProd={setTempSelectedProd}
            />
          ))}
        </div>

        <div className="modal-footer">
          <div>
            <span>{tempSelectedProd?.length} product selected</span>
          </div>
          <div className="action-button-wrapper">
            <button onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button onClick={handleAddProduct} className="add-button">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductItem = ({
  data,
  handleOnClickProduct,
  handleOnClickVariant,
  isSelectedProduct,
  setTempSelectedProd,
}) => {
  return (
    <>
      <div className="product-main">
        <input
          type="checkbox"
          onChange={() => handleOnClickProduct(data, setTempSelectedProd)}
          checked={!!isSelectedProduct}
          className="product-checkbox"
        />
        <img
          className="product-image"
          src={data?.image?.src}
          alt={data?.title}
        />
        <span className="product-title">{data?.title}</span>
      </div>

      <div>
        {data?.variants?.map((item) => (
          <div key={item?.id} className="variant-item">
            <div>
              <input
                type="checkbox"
                checked={isSelectedProduct?.variants?.some(
                  (variant) => variant?.id === item?.id
                )}
                onChange={() =>
                  handleOnClickVariant(data, item, setTempSelectedProd)
                }
                className="product-checkbox"
              />
            </div>
            <div className="variant-info">
              <span className="variant-title">{item?.title}</span>
              <span className="variant-availability">
                {item?.inventory_quantity} available
              </span>
              <span className="variant-price">${item?.price}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectProductModal;
