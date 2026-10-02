              </a>
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="px-5 border border-[#0A4E9B]/20 hover:bg-[#0A4E9B]/5 text-xs text-[#0A4E9B] rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EVENTS MODAL (FOOTER HOOK) */}
      {isEventsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white border border-[#0A4E9B]/10 rounded-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setIsEventsModalOpen(false)} 
              className="absolute top-4 right-4 text-[#52677D] hover:text-[#0A4E9B]"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs text-[#C5A059] uppercase tracking-widest font-bold mb-2">
              ARPRAN Events
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0A4E9B] mb-3">Upcoming Stone Expos</h3>
            <p className="text-xs text-[#334E68] leading-relaxed mb-4">
              Schedule updates for upcoming national and international stone trade fairs will be posted here.
            </p>
            <div className="p-3 bg-[#0A4E9B]/5 rounded border border-[#0A4E9B]/10 text-xs text-[#52677D] mb-6">
              Status: Trade fair calendar updating.
            </div>
            <button 
              onClick={() => setIsEventsModalOpen(false)}
              className="w-full bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-wider py-2.5 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON (Exact number from brochure: +91-94140 68933) */}
      <a
        href={`https://wa.me/${COMPANY_INFO.offices.india.whatsappNumber}?text=Hello%20Arpran%20Industries,%20I%20am%20interested%20in%20natural%20stone%20export.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] text-black p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="WhatsApp Arpran"
      >
        <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
          WhatsApp Us
        </span>
      </a>

      {/* FLOATING CHATBOT ASSISTANT */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-[#0A4E9B] hover:bg-[#083b77] text-[#0A4E9B] p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-105"
            aria-label="Stone Assistant"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-xs font-semibold pr-1 hidden sm:inline">Ask ARPRAN</span>
          </button>
        )}

        {isChatOpen && (
          <div className="bg-[#151722] border border-[#0A4E9B]/10 rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden">
            <div className="bg-[#0A4E9B] p-4 flex items-center justify-between text-[#0A4E9B]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none">ARPRAN Stone Consultant</h4>
                  <span className="text-[10px] text-[#0A4E9B]/80">Jaipur HQ Assistant</span>
                </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-[#0A4E9B]/80 hover:text-[#0A4E9B]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 h-72 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[82%] p-3 rounded-xl leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-[#C5A059] text-black font-medium' 
                        : 'bg-[#F7FAFF] text-slate-200 border border-[#0A4E9B]/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#0A4E9B]/10 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about granite, marble or sizes..."
                className="flex-1 bg-[#1a1c26] border border-[#0A4E9B]/10 rounded-full px-4 py-2 text-xs text-[#0A4E9B] placeholder-slate-500 focus:outline-none focus:border-[#C5A059]"
              />
              <button
                type="submit"
                className="p-2 bg-[#0A4E9B] hover:bg-[#083b77] text-[#0A4E9B] rounded-full transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
