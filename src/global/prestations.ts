import { API } from "../API/API.js";
import { Popup } from "./Popup.js";

type PrestationPreparation = {
    route: string,
    body: Object
}
export const prestations = () => {
    API.addReservation(JSON.stringify({
        total_price: 0,
        user_id: API.getCookie("id")
    })).then(reservation_id => {
        const prestations: Array<PrestationPreparation> = [];
        const payButton = <HTMLButtonElement> document.getElementById("pay");
    
        payButton.onclick = () => {
            document.cookie = `prixTotal=${getTotal()};path=/`;
            document.cookie = `prestations=${JSON.stringify(prestations)};path=/`;
            const iframe = document.createElement("iframe");
            iframe.src = "/pay.html";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";
            const paymentPopup = new Popup(iframe, "Payment");
            paymentPopup.generate();
        }
    
    const submitLand = <HTMLButtonElement> document.getElementById("addLand");const planeTypeInput = <HTMLSelectElement> document.getElementById("planeType");
    const noiseGroupInput = <HTMLSelectElement> document.getElementById("noiseGroup");
    const basedInput = <HTMLInputElement> document.getElementById("based");
    const timeInput = <HTMLInputElement> document.getElementById("timeLanding");
    const dateInput = <HTMLInputElement> document.getElementById("landingDate");
    const mensuelInput = <HTMLInputElement> document.getElementById("mensuel");
    const mensuelLabel = <HTMLLabelElement> document.getElementById("mensuelLabel");
    
    const submitBalisage = <HTMLButtonElement> document.getElementById("addBalisage");
    const balisageInput = <HTMLSelectElement> document.getElementById("balisageSelect");
    const balisageDateInput = <HTMLInputElement> document.getElementById("balisageDate");
    
    const submitEssence = <HTMLButtonElement> document.getElementById("addEssence");
    const typeEssenceInput = <HTMLSelectElement> document.getElementById("type_essence");
    const qqtEssenceInput = <HTMLInputElement> document.getElementById("qtt_essence");
    const essenceDateinput = <HTMLInputElement> document.getElementById("essenceDate");
    
    const submitParking = <HTMLButtonElement> document.getElementById("addParking");
    const startDateInput = <HTMLInputElement> document.getElementById("startParkingDate");
    const endDateInput = <HTMLInputElement> document.getElementById("endParkingDate");
    const lengthInput = <HTMLInputElement> document.getElementById("parkingLongueur");
    const widthInput = <HTMLInputElement> document.getElementById("parkingEnvergure");
    const weightInput = <HTMLInputElement> document.getElementById("parkingMasse");
    const basedParkingInput = <HTMLInputElement> document.getElementById("basedParking");
    
    const submitOParking = <HTMLButtonElement> document.getElementById("addOParking");
    const startDateOInput = <HTMLInputElement> document.getElementById("startOParkingDate");
    const nbWeeksinput = <HTMLInputElement> document.getElementById("nbWeekOParking");
    const widthOInput = <HTMLInputElement> document.getElementById("oParkingLongueur");
    const lengthOInput = <HTMLInputElement> document.getElementById("oParkingEnvergure");
    
    const prestationSelector = <HTMLSelectElement> document.getElementById("prestationSelector");
    const recapitulate = <HTMLElement> document.getElementById("recapitulate");
    
    prestationSelector.onchange = () => {
        if(prestationSelector.value != "none") {
            removeSelector("none");
    
            for(const form of document.getElementsByTagName("form")) {
                form.hidden = true;
            }
    
            const prestation = <HTMLFormElement> document.getElementById(prestationSelector.value);
            prestation.hidden = false;
        }
    }
    
    const removeSelector = (selector: string) => {
        for(const option of prestationSelector.getElementsByTagName("option")) {
            if(option.value === selector) {
                option.hidden = true;
            }
        }
    }
    
    const resetSelector = () => {
        for(const option of prestationSelector.getElementsByTagName("option")) {
            if(option.value === "none") {
                option.hidden = false;
            }
        }
        prestationSelector.value = "none";
        prestationSelector.dispatchEvent(new Event("change"));
    }
    
    const hideForm = (id: string) => {
        const form = <HTMLFormElement> document.getElementById(id);
        form.hidden = true;
    }
    
    const formatPrice = (price: number): number => {
        return Math.round(price * 100)/100;
    }
    const getTotal = (): number => {
        const total = <HTMLSpanElement> document.getElementById("total");
        return parseFloat(total.innerText);
    }
    const addToTotal = (amount: number) => {
        const total = <HTMLSpanElement> document.getElementById("total");
        let totalValue = parseFloat(total.innerText);
        totalValue += amount;
        total.innerText = `${formatPrice(totalValue)}`;
    } 
    
    const dateToApiFormat = (date: Date): string => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding a leading zero if the month is less than 10
        const day = date.getDate().toString().padStart(2, '0'); // Adding a leading zero if the day is less than 10
        return `${year}-${month}-${day} 00:00:00`;}
    
    basedInput.onclick = () => {
        if(basedInput.checked) {
            mensuelInput.hidden = false;
            mensuelLabel.hidden = false;
        } else {
            mensuelInput.hidden = true;
            mensuelLabel.hidden = true;
        }
    }
    
    submitLand.onclick = () => {
        land();
    }
    
    submitBalisage.onclick = () => {
        balisage();
    }
    
    submitEssence.onclick = () => {
        essence();
    }
    
    submitParking.onclick = () => {
        parking();
    }
    
    submitOParking.onclick = () => {
        oParking();
    }
    
    const land = () => {
    
        const planeType = planeTypeInput.value;
        const noiseGroup = noiseGroupInput.value;
        const based = basedInput.checked ? true : false;
        const date = new Date(Date.parse(`${dateInput.value} ${timeInput.value}`));
        const mensuel = mensuelInput.checked ? true : false;
    
        let baseTarif = 0;
        let noiseMultipliant = 0;
    
        fetch("../data/prestations.json").then(response => response.json()).then(data => {
            if(planeType === "tur") {
                if(date.getDay() === 0 || date.getDay() === 6) {
                    baseTarif = data.tarifs.redevance_atterrissage.turbine.weekend_jf.ttc;
                } else {
                    baseTarif = data.tarifs.redevance_atterrissage.turbine.semaine.ttc;
                }
                if(based) {
                    baseTarif = data.tarifs.redevance_atterrissage.turbine.avion_base_unite.ttc;
                    if(mensuel) {
                        baseTarif = data.tarifs.redevance_atterrissage.turbine.avion_base_mensuel.ttc;
                    }
                }
            } else if(planeType == "ulm" || planeType == "heli") {
                baseTarif = data.tarifs.redevance_atterrissage.turbine.semaine.ttc/2;
            } else {
                if(date.getDay() === 0 || date.getDay() === 6) {
                    baseTarif = data.tarifs.redevance_atterrissage.reacteur.weekend_jf.ttc;
                } else {
                    baseTarif = data.tarifs.redevance_atterrissage.reacteur.semaine.ttc;
                }
                if(based) {
                    baseTarif = data.tarifs.redevance_atterrissage.reacteur.avion_base_unite.ttc;
                    if(mensuel) {
                        baseTarif = data.tarifs.redevance_atterrissage.reacteur.avion_base_mensuel.ttc;
                    }
                }
            }
    
            if(date.getHours() < 6 || date.getHours() > 22) {
                noiseMultipliant = data.tarifs.groupes_acoustiques[noiseGroup].nuit;
            } else {
                noiseMultipliant = data.tarifs.groupes_acoustiques[noiseGroup].jour_soir;
            }
            
    
            const li = document.createElement("li");
            li.innerText = `Aterissage: ${formatPrice(baseTarif * noiseMultipliant)}`;
            recapitulate.appendChild(li);
            removeSelector("land");
            hideForm("land");
            resetSelector();
            addToTotal(formatPrice(baseTarif * noiseMultipliant));
            prestations.push({
                route: "servicereservations",
                body: {
                    reservation_id: reservation_id,
                    service_id: 1,
                    datetime: dateToApiFormat(date),
                    price: formatPrice(baseTarif * noiseMultipliant)
                }
            });
            console.log(prestations);
        });
    }
    
    const balisage = () => {
        const date = new Date(Date.parse(balisageDateInput.value));
        const balisage = parseInt(balisageInput.value);
        fetch("../data/prestations.json").then(response => response.json()).then(data => {
            const price = balisage * data.tarifs.redevance_balisage.ttc;
            const li = document.createElement("li");
            li.innerText = `Balisage: ${formatPrice(price)}`;
            recapitulate.appendChild(li);
            removeSelector("balisage");
            hideForm("balisage");
            resetSelector();
            addToTotal(formatPrice(price));
            prestations.push({
                route: "servicereservations",
                body: {
                    reservation_id: reservation_id,
                    service_id: 2,
                    datetime: dateToApiFormat(date),
                    price: formatPrice(price)
                }
            });
        });
    }
    
    const essence = () => {
        const typeEssence = typeEssenceInput.value;
        const qqtEssence = parseInt(qqtEssenceInput.value);
        const date = new Date(Date.parse(essenceDateinput.value));
    
        fetch("../data/prestations.json").then(response => response.json()).then(data => {
            const price = qqtEssence * data.tarifs.produits_petroliers[typeEssence].ttc;
            const li = document.createElement("li");
            li.innerText = `Essence: ${formatPrice(price)}`;
            recapitulate.appendChild(li);
            removeSelector("essence");
            hideForm("essence");
            resetSelector();
            addToTotal(formatPrice(price));
            prestations.push({
                route: "servicereservations",
                body: {
                    reservation_id: reservation_id,
                    service_id: 3,
                    datetime: dateToApiFormat(date),
                    price: formatPrice(price)
                }
            });
        })
    }
    
    const parking = () => {
        let price = 0;
        let category = 0;
        const startDate = new Date(Date.parse(`${startDateInput.value}`));
        const endDate = new Date(Date.parse(`${endDateInput.value}`));
        const length = parseInt(lengthInput.value);
        const width = parseInt(widthInput.value);
        const weight = parseFloat(weightInput.value);
        const surface = width * length;
        const based = basedParkingInput.checked ? true : false;
        let duration = (endDate.getTime() - startDate.getTime())/(1000 * 3600 * 24) + 1;
        duration = duration >= 1 ? duration : 1;
    
        if(weight < 0.5) {
            if(surface < 100) {
                category = 2;
            } else {
                category = 3;
            }
        } else if(weight < 1) {
            if(surface < 60) {
                category = 2;
            } else {
                category = 3;
            }
        } else {
            if(surface < 100) {
                category = 3;
            } else {
                category = 1;
            }
        }
        fetch("../data/prestations.json").then(response => response.json()).then(data => {
            if(based) {
                while(duration > 30) {
                    duration = duration - 30;
                    price += data.tarifs.redevance_abris[`categorie_${category}`].base.mensuel.ttc;
                }
                price += duration * data.tarifs.redevance_abris[`categorie_${category}`].base.unite.ttc;
            } else {
                price = duration * data.tarifs.redevance_abris[`categorie_${category}`].unite.ttc;
            }
            API.getParkingDisponibility({
                start_time: dateToApiFormat(startDate),
                end_time: dateToApiFormat(endDate),
                length: length,
                wingspan: width,
                type: "interior"}).then(parking_id => {
                    if(typeof parking_id == "number") {
                        const li = document.createElement("li");
                    li.innerText = `Abris: ${formatPrice(price)}`;
                    recapitulate.appendChild(li);
                    removeSelector("parking");
                    hideForm("parking");
                    resetSelector();
                    addToTotal(formatPrice(price));
            
                    prestations.push({
                        route: "parkingreservations",
                        body: {
                            reservation_id: reservation_id,
                            parking_id: parking_id,
                            start_time: dateToApiFormat(startDate),
                            end_time: dateToApiFormat(endDate),
                            price: price
                        }
                    })
                    console.log(prestations);
                    }
                }).catch(() => {
                    const p = document.createElement("p");
                    p.innerText = "No Parking available with the specified attributes";
                    const errorPopup = new Popup(p, "Error");
                    errorPopup.generate();
                    
                })
        })
    }
    
    const oParking = () => {
        const startDate = new Date(Date.parse(startDateOInput.value));
        const nbWeek = parseInt(nbWeeksinput.value);
        const length = parseInt(lengthOInput.value);
        const width = parseInt(widthOInput.value);
        const surface = length * width;
    
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + nbWeek * 7);
    
        fetch("../data/prestations.json").then(response => response.json()).then(data => {
            const price = (nbWeek - 2) * surface * data.tarifs.redevance_stationnement_exterieur.ttc;
    
    
            API.getParkingDisponibility({
                start_time: dateToApiFormat(startDate),
                end_time: dateToApiFormat(endDate),
                length: length,
                wingspan: width,
                type: "exterior"}).then(parking_id => {
                    if(typeof parking_id == "number") {
                        const li = document.createElement("li");
                        li.innerText = `Emplacement: ${formatPrice(price)}`;
                        recapitulate.appendChild(li);
                        removeSelector("oParking");
                        hideForm("oParking");
                        resetSelector();
                        addToTotal(formatPrice(price));
                
                        prestations.push({
                            route: "parkingreservations",
                            body: {
                                reservation_id: reservation_id,
                                parking_id: parking_id,
                                start_time: dateToApiFormat(startDate),
                                end_time: dateToApiFormat(endDate),
                                price: price
                            }
                        })
                        console.log(prestations);
                    }
                }).catch(() => {
                    const p = document.createElement("p");
                    p.innerText = "No Parking available with the specified attributes";
                    const errorPopup = new Popup(p, "Error");
                    errorPopup.generate();
                    
                })
        })
    }
    })
}
