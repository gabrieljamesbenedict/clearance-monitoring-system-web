import Image from 'next/image';
import mapuaLogo from '@/images/mapua_logo2.png'

const NavigationBar = () => {
  return (
    <div className='bg-primary flex px-8 py-4 text-white'>
      <Image 
        src={mapuaLogo}
        alt="Mapua University logo"
        className='h-16 w-auto'
      />
    </div>
  )
}

export default NavigationBar