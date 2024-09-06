import { Menu, MenuButton, MenuList, MenuItem, Tooltip } from "@chakra-ui/react";
import { IoFilterSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

function FilterCategory({ handleFilterCategory }) {
  const [categories, setCategories] = useState([]);
  const toast = useToast();

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://yourhr-2des.onrender.com/categories');
        setCategories(res.data);
      } catch (error) {
        toast({
          title: 'Error fetching categories',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchCategories();
  }, [toast]);

  return (
    <Menu>
      <Tooltip hasArrow label="Filter category">
        <MenuButton>
          <IoFilterSharp size={24} />
        </MenuButton>
      </Tooltip>

      <MenuList>
        {categories.map((category) => (
          <MenuItem key={category.id} onClick={() => handleFilterCategory(category.id)}>
            {category.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default FilterCategory;
