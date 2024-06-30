import { useSelector } from 'react-redux';
import Image from 'next/image';
import Link from "next/link";

function ProductList() {
  const state = useSelector((state) => state.products);
  return (
  <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
    {state.map((product) => (
    <div key={product.id} className="bg-white rounded-lg mx-auto transition-all duration-500 overflow-hidden shadow-lg ring-4 ring-secondary hover:shadow-xl hover:ring-primary ring-opacity-40 max-w-sm">
    <div className="relative">
        <Image className="object-cover w-full h-[350px] rounded-t-lg" src={product?.attributes?.product_Image?.data[0]?.attributes?.url} alt='product' width={350} height={400}/>
        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">SALE
        </div>
    </div>
    <div className="p-4 dark:bg-[#171717] h-full">
        <h3 className="text-lg font-medium mb-2 dark:text-white line-clamp-2">{product?.attributes?.product_Name}</h3>
        <p className="text-gray-400 uppercase font-bold text-sm mb-4 dark:text-neutral-300">{product?.attributes?.product_Category}</p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 dark:text-neutral-300">{product?.attributes?.product_Description[0].children[0].text}</p>
        <div className="flex items-center justify-between">
            <span className="font-bold text-lg dark:text-white">${product?.attributes?.product_Price}</span>
            <Link href={`/product-details/${product.id}`} className="transition-all duration-500 bg-primary hover:bg-secondary text-black font-bold py-2 px-4 rounded">
                Details
            </Link>
        </div>
    </div>
    </div>
    ))}
    </div>
  )
}

export default ProductList