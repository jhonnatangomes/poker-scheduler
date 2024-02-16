export default function Index() {
  return (
    <div className='flex h-screen bg-blue-50 text-blue-900'>
      <Sidebar />
      <MainContent />
    </div>
  );
}

function Sidebar() {
  return (
    <aside className='bg-blue-100 w-64 p-6'>
      <h1 className='text-blue-900 text-2xl font-bold mb-6'>Sidebar</h1>
      <ul className='flex flex-col gap-y-2'>
        <li>
          <a href='#' className='text-blue-900 hover:underline'>
            Link 1
          </a>
        </li>
        <li>
          <a href='#' className='text-blue-900 hover:underline'>
            Link 2
          </a>
        </li>
        <li>
          <a href='#' className='text-blue-900 hover:underline'>
            Link 3
          </a>
        </li>
      </ul>
    </aside>
  );
}

function MainContent() {
  return (
    <main className='flex-1 p-6'>
      <section className='mb-6'>
        <h2 className='text-xl font-bold mb-2'>Filters</h2>
        <div className='bg-white p-4 shadow-md rounded-md flex flex-wrap gap-y-4'>
          <div className='w-full md:w-1/3 md:pr-2 mb-4 md:mb-0'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Name
            </label>
            <input
              type='text'
              placeholder='Name'
              className='block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4'
            />
          </div>
          <div className='w-full md:w-1/3 md:pr-2 mb-4 md:mb-0'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Buy In (Min)
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <span className='text-gray-500'>$</span>
              </div>
              <input
                type='number'
                step='0.01'
                placeholder='0.00'
                className='block w-full h-10 pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>
          </div>
          <div className='w-full md:w-1/3 mb-4 md:mb-0'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Buy In (Max)
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <span className='text-gray-500'>$</span>
              </div>
              <input
                type='number'
                step='0.01'
                placeholder='0.00'
                className='block w-full h-10 pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              />
            </div>
          </div>
          <div className='w-full md:w-1/3 md:pr-2 mb-4 md:mb-0'>
            <label className='block text-sm font-medium text-gray-700'>
              Network
            </label>
            <div>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-500'
                />
                <span className='ml-2 text-gray-700'>Option 1</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-500'
                />
                <span className='ml-2 text-gray-700'>Option 2</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-500'
                />
                <span className='ml-2 text-gray-700'>Option 3</span>
              </label>
            </div>
          </div>
          <div className='w-full md:w-1/3 md:pr-2 mb-4 md:mb-0'>
            <label className='block text-sm font-medium text-gray-700'>
              Number of Players (Min)
            </label>
            <div className='relative'>
              <input
                type='number'
                min='0'
                placeholder='0'
                className='block w-full h-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4'
              />
            </div>
          </div>
          <div className='w-full md:w-1/3'>
            <label className='block text-sm font-medium text-gray-700'>
              Number of Players (Max)
            </label>
            <div className='relative'>
              <input
                type='number'
                min='0'
                placeholder='0'
                className='block w-full h-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4'
              />
            </div>
          </div>
          <div className='w-full md:w-1/3 md:pr-2 mb-4 md:mb-0'>
            <label className='block text-sm font-medium text-gray-700'>
              Variant
            </label>
            <div>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-500'
                />
                <span className='ml-2 text-gray-700'>Option 1</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-500'
                />
                <span className='ml-2 text-gray-700'>Option 2</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-500'
                />
                <span className='ml-2 text-gray-700'>Option 3</span>
              </label>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h2 className='text-xl font-bold mb-2'>Table</h2>
        <div className='bg-white p-4 shadow-md rounded-md'>
          {/* Your table component can go here */}
          <table className='min-w-full'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Header 1</th>
                <th className='px-4 py-2'>Header 2</th>
                <th className='px-4 py-2'>Header 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border px-4 py-2'>Data 1</td>
                <td className='border px-4 py-2'>Data 2</td>
                <td className='border px-4 py-2'>Data 3</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
