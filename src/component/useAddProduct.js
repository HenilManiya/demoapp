import { useState } from "react";
import { getProductApi } from "../helpers/api";
import useDebounce from "../hooks/useDebounce";

export const useAddProduct = () => {
  const [productList, setProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([{}]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isProductModel, setIsProductModel] = useState(false);
  const [dragId, setDragId] = useState({});
  const [tempSelectedProd, setTempSelectedProd] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClickAddProduct = () => {
    setSelectedProduct((prev) => [...prev, {}]);
  };

  const handleOnSelection = (index) => {
    setIsProductModel(true);
    setSelectedIndex(index);
  };

  const handleOnClickProduct = (prod, callback) => {
    callback((prev) => {
      const exists = prev.some((item) => item.id === prod.id);
      if (exists) {
        return prev.filter((item) => item.id !== prod.id);
      } else {
        return [...prev, prod];
      }
    });
  };
  const handleOnClickVariant = (prod, variant, callback) => {
    callback((prev) => {
      let value = [...prev];
      const existsIndex = value.findIndex((item) => item.id === prod.id);
      if (existsIndex >= 0) {
        const isVarient = value[existsIndex].variants.some(
          (varnt) => varnt.id === variant.id
        );
        value[existsIndex] = {
          ...value[existsIndex],
          variants: isVarient
            ? value[existsIndex].variants.filter(
                (item) => item.id !== variant.id
              )
            : [...value[existsIndex].variants, variant],
        };
        return value;
      } else {
        return [...prev, { ...prod, variants: [variant] }];
      }
    });
  };

  const handleClickShowVarientDiscount = (index, type) => {
    setSelectedProduct((prev) => {
      let value = [...prev];
      value[index] = { ...value[index], [type]: !value[index][type] };
      return value;
    });
  };
  const handleOnChangeDiscount = (e,index) => {
    const { value, name } = e.target;
    setSelectedProduct((prev) => {
      let values = [...prev];
      values[index] = { ...values[index], [name]: value };
      return values;
    });
  };

  const handleDragStart = (index) => {
    setDragId(index);
  };

  const handleDrop = (index, item, prodIndex, type) => {
    setSelectedProduct((prev) => {
      if (type === "varient") {
        const varients = array_move(item.variants, dragId, index);
        prev[prodIndex] = { ...prev[prodIndex], variants: varients };
        return prev;
      } else {
        return array_move(prev, dragId, index);
      }
    });
    setDragId(null); // Reset dragId after drop
  };
  const array_move = (arr, oldIndex, newIndex) => {
    const movedItem = arr[oldIndex];
    arr.splice(oldIndex, 1);
    arr.splice(newIndex, 0, movedItem);
    return arr;
  };

  const handleAddProduct = () => {
    const value = [...selectedProduct];
    value.splice(selectedIndex, 1, ...tempSelectedProd);
    setSelectedProduct(value);
    setTempSelectedProd([]);
    setIsProductModel(false);
  };
  const handleGetProduct = async (page, limit, search) => {
    const productData = await getProductApi(page, limit, search);
    setProductList(productData);
  };
  const Scroll = async (e) => {
    let { clientHeight, scrollTop, scrollHeight } = e.target;
    if (isLoading) return;
    setIsLoading(true);
    if (Math.ceil(clientHeight + scrollTop) >= scrollHeight) {
      setPagination((prev) => {
        return { ...prev, page: prev.page + 1 };
      });
      const productData = await getProductApi(
        pagination.page + 1,
        pagination.limit,
        searchValue
      );

      setProductList((prev) => [...prev, ...productData]);
    }
    setIsLoading(false);
  };
  const handleOnChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };
  const debounceSearch = useDebounce(searchValue, 1000);
  return {
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
    tempSelectedProd,
    setTempSelectedProd,
    handleAddProduct,
    productList,
    setProductList,
    handleGetProduct,
    Scroll,
    handleOnChangeSearch,
    handleOnChangeDiscount,
    pagination,
    searchValue,
    debounceSearch,
  };
};
