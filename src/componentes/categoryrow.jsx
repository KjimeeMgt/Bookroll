import Chip from './chips';

function CategoryRow ( {
    categories = [], 
    activeCategory, 
    onCategoryClick } ) {

    return (
        <div className='flex flex-wrap gap-2'>
            { categories.map( (cat) => (
                <Chip
                    key={cat}
                    active={cat === activeCategory}
                    onClick={() => onCategoryClick(cat)}
                >
                    {cat}
                </Chip>
            )) }
        </div>
    );
}

export default CategoryRow;