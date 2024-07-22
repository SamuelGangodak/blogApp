import { Link } from 'react-router-dom'

const BlogCard = (prop) => {
  let blogdata=prop.blogdata;
  const apiURL='http://localhost:3000/'
  return (
    <div className='bg-white shadow-md overflow-hidden rounded-xl'>
      <Link to={`/blog/${blogdata.id}`}>
        <div className="flex flex-col w-full">
          <img src={apiURL+blogdata.image} className='w-full h-[250px]'  style={{backgroundRepeat:'no-repeat', backgroundSize: 'cover'}} alt=""/>
          <div className="p-2">
            <h2 className='mt-1 text-xl text-left'>{blogdata.title}</h2>
            <p className='text-sm text-left opacity-70'>{blogdata.category}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogCard
