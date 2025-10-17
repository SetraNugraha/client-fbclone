import { RxPlus } from '../../assets/icons'
import { listMenu, listLanguage } from '../../dummyData/dummyData'

export default function Footer() {
  return (
    <>
      {/* Bahasa */}
      <div>
        <div className="flex gap-3 border-b-[2px] py-3">
          {listLanguage.map((language, index) => (
            <div key={index}>
              <a
                href="#"
                className="text-sm text-slate-400 hover:underline"
              >
                {language}
              </a>
            </div>
          ))}
          <button className="bg-slate-100 h-[20px] my-1 border border-slate-200 w-[30px] hover:bg-slate-300">
            <RxPlus className="w-[20px] mx-auto" />
          </button>
        </div>

        {/* Footer Menu */}
        <div className="flex flex-wrap gap-3 mt-2">
          {listMenu.map((menu, index) => (
            <div key={index}>
              <a
                href="#"
                className="text-sm text-slate-400 hover:underline"
              >
                {menu}
              </a>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-5">
          <p className="text-xs text-slate-500">Meta &copy; 2024</p>
        </div>
      </div>
    </>
  )
}
