import React from "react";
import "./addProduct.css";
import sixDot from "../../assets/svgIcon/6dot.svg";
import Edit from "../../assets/svgIcon/edit.svg";
import { useAddProduct } from "../useAddProduct";
import SelectProductModal from "../SelectProduct";

const AddProduct = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    selectedIndex,
    isProductModel,
    setIsProductModel,
    handleDrop,
    handleDragStart,
    handleOnSelection,
    handleClickShowVarientDiscount,
    handleOnClickProduct,
    handleOnClickVariant,
    handleOnClickAddProduct,
    handleAddProduct,
    setTempSelectedProd,
    tempSelectedProd,
  } = useAddProduct();
  return (
    <>
      <div className="add-product-container">
        <h2 className="title">Add Products</h2>
        <div className="product-wrapper">
          <div className="product-row">
            <div className="column empty"></div>
            <div className="column empty"></div>
            <div className="column">Product</div>
            <div className="column">Discount</div>
          </div>

          {selectedProduct.map((item, index) => {
            return (
              <div className="product-section" key={index} id={index}>
                <div
                  className="product-row"
                  onDragOver={(ev) => ev.preventDefault()}
                  onDrop={() => handleDrop(index)}
                  onDrag={() => handleDragStart(index)}
                  draggable
                >
                  <div className="column drag-handle">
                    <img src={sixDot} alt="drag" />
                  </div>
                  <div className="column index">{index + 1}.</div>
                  <div className="column product-select selection-box">
                    <span className="product-title">
                      {item.title ? item.title : "Select Product"}
                    </span>
                    <img
                      src={Edit}
                      className="edit-icon"
                      onClick={() => handleOnSelection(index)}
                      alt="edit"
                    />
                  </div>
                  <div className="column discount-section">
                    {item?.discount ? (
                      <div className="discount-action-btn">
                        <input />
                        <select>
                          <option>% off</option>
                          <option>flat off</option>
                        </select>
                      </div>
                    ) : (
                      <button
                        className="add-discount-btn"
                        onClick={() =>
                          handleClickShowVarientDiscount(index, "discount")
                        }
                      >
                        Add Discount
                      </button>
                    )}

                    {item.variants && (
                      <span
                        className="show-variants-btn"
                        onClick={() =>
                          handleClickShowVarientDiscount(index, "varient")
                        }
                      >
                        {item?.varient ? "Hide Variants" : "Show Variants"}
                      </span>
                    )}
                  </div>
                  <div
                    className="column"
                    onClick={() =>
                      handleOnClickProduct(item, setSelectedProduct)
                    }
                  >
                    X
                  </div>
                </div>

                {item?.varient && item.variants && (
                  <div className="variants-container">
                    {item.variants.map((varnt, vIndex) => (
                      <div
                        key={vIndex}
                        className="variant-row column variant-content"
                        onDragOver={(ev) => ev.preventDefault()}
                        onDrop={() =>
                          handleDrop(vIndex, item, index, "varient")
                        }
                        onDrag={() => handleDragStart(vIndex)}
                        draggable
                      >
                        <img src={sixDot} alt="drag" />
                        <div className="variant-title-box">{varnt.title}</div>
                        <div className="discount-action-btn">
                          <input />
                          <select>
                            <option>% off</option>
                            <option>flat off</option>
                          </select>
                        </div>
                        <div
                          className=""
                          onClick={() =>
                            handleOnClickVariant(
                              item,
                              varnt,
                              setSelectedProduct
                            )
                          }
                        >
                          X
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="add-product-btn-wrapper">
            <button
              className="add-product-btn"
              onClick={handleOnClickAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
      {isProductModel && (
        <SelectProductModal
          onClose={() => setIsProductModel(false)}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          selectedIndex={selectedIndex}
          handleOnClickProduct={handleOnClickProduct}
          handleOnClickVariant={handleOnClickVariant}
          handleAddProduct={handleAddProduct}
          setTempSelectedProd={setTempSelectedProd}
          tempSelectedProd={tempSelectedProd}
        />
      )}
    </>
  );
};

export default AddProduct;
