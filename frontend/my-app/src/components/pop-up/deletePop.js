import React from 'react'

function pop(){
    return(
            <div className="Popup-Background">
              <div className="Popup-Container">
                <div className="Popup-Content">
                  <h2>Qual o tipo da doação a ser criada?</h2>
                  <div className="Popup-button-container">
                    <button className="btn-popup primary" onClick={OpenBank}>
                      Bancária
                    </button>
                    <button className="btn-popup primary" onClick={OpenProduct}>Produto</button>
                    <button className="btn-popup seconday" onClick={closePopup}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>

    )
}

export default pop