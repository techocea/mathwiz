import React from 'react'

const FloatingSymbols = () => {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.05]">
            <span className="absolute top-[10%] left-[5%] text-[120px] font-serif italic text-slate-900 animate-float">∑</span>
            <span className="absolute top-[40%] right-[8%] text-[100px] font-serif italic text-slate-900 animate-float" style={{ animationDelay: '1s' }}>∫</span>
            <span className="absolute bottom-[15%] left-[12%] text-[80px] font-serif italic text-slate-900 animate-float" style={{ animationDelay: '2s' }}>θ</span>
            <span className="absolute top-[60%] right-[25%] text-[90px] font-serif italic text-slate-900 animate-float" style={{ animationDelay: '1.5s' }}>π</span>
            <span className="absolute bottom-[30%] right-[10%] text-[70px] font-serif italic text-slate-900 animate-float" style={{ animationDelay: '0.5s' }}>λ</span>
        </div>
    )
}

export default FloatingSymbols