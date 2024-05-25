import CategoriesList from "./CategoriesList"
import CategoriesForm from "./CategoryForm"
function CategoriesContainer(props){
    return (
        <div>
            {props.categories.length === 0 ? <p>No Categories Found ! Add First Categories</p>:(
                <div>
                    <p>Listing Categories {props.categories.length}</p>
                    <CategoriesList 
                    categories={props.categories} 
                    editCategory={props.editCategory}
                    removeCategory={props.removeCategory}
                    />
                </div>
            )}
            <CategoriesForm
            addCategory={props.addCategory}
            />
        </div>
    )
}

export default CategoriesContainer