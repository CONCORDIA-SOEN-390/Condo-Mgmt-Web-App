import React from 'react'
import {UserBio} from '@/components/ProfilePageComponents//ProfileInfo'

function page() {
    return (
        <div className="flex min-h-screen-nav items-center justify-center h-full bg-lime-50">
          <div className="relative  mx-auto md:max-w-2xl   break-words bg-white  w-full shadow-lg rounded-xl ">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full flex justify-center">
                  <div className="relative">
                    <div className=" mt-5 w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-4xl font-bold">W</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-20">
                William
                <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt text-slate-400 opacity-75"></i>willnazarian@gmail.com
                </div>
              </div>
              <div className="mt-6 py-6 border-t border-slate-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="px-4">
                    <UserBio/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default page