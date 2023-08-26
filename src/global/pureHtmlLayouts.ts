export const htmlBookPlaneLayout = `<div id="planelayout">
<iframe src="/calendar.html"></iframe>
<form>
    <h2>Réserver un avion</h2>
    <div style="display: flex">
        <input type="date" name="startDate" id="startDate">
        <input type="time" name="startTime" id="startHour" step="900">
    </div>
    <div style="display: flex">
        <input type="date" name="endDate" id="endDate">
        <input type="time" name="endTime" id="endHour" step="900">
    </div>
    <select id="selectPlane" hidden>

    </select>
    <input type="checkbox" name="withInstructor" id="withInstructor" hidden>
    <select id="selectInstructor" hidden>

    </select>
    <button type="button" id="bookPlane">Book</button>
</form>
</div>`;


export const htmlPrestationLayout = `<div class="stb-html-layout" id="presta">

<main>
<section>
<header>
<select id="prestationSelector">
    <option value="none"></option>
    <option value="land">Aterissage</option>
    <option value="balisage">Balisage</option>
    <option value="essence">Essence</option>
    <option value="parking">Abris</option>
    <option value="oParking">Emplacement</option>
</select>
</header>
    <form hidden id="land">
        <label for="landingDate">Date/hour: </label>
        <div>
            <input type="date" id="landingDate">
            <input type="time" id="timeLanding">
        </div>
        <label for="planeType">Plane type: </label>
        <select id="planeType">
            <option value="ulm">ULM</option>
            <option value="heli">Helicoptère</option>
            <option value="tur">Avion Mono-Turbine/Bi-Turbine</option>
            <option value="react">Avion Réacteur Mono/Multi</option>
        </select>
        <label for="noiseGroup">Groupe acoustique: </label>
        <select id="noiseGroup">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5a</option>
            <option>5b</option>
        </select>
        <label for="based">Avion basé: </label>
        <input type="checkbox" id="based">
        <label id="mensuelLabel" for="mensuel" hidden>Abonnement mensuel: </label>
        <input type="checkbox" id="mensuel" hidden>
        <button type="button" id="addLand">Add</button>
    </form>
    <form hidden id="balisage">
        <label for="balisageDate">Date: </label>
        <input type="date" id="balisageDate">
        <label for="balisageSelect">Durée: </label>
        <select id="balisageSelect">
            <option value="1">30 min</option>
            <option value="2">60 min</option>
            <option value="3">90 min</option>
            <option value="4">120 min</option>
            <option value="5">150 min</option>
            <option value="6">180 min</option>
            <option value="7">210 min</option>
        </select>
        <button type="button" id="addBalisage">Add</button>
    </form>
    <form hidden id="essence">
        <label for="essenceDate">Date: </label>
        <input type="date" id="essenceDate">
        <label for="type_essence">Type: </label>
        <select id="type_essence">
            <option value="JETA1_sans_TIC">JETA1 Sans TIC</option>
            <option value="JETA1_A1_plus_TIC">JETA1 A1 + TIC</option>
            <option value="AVGAS_100LL_sans_TIC">AVGAS 100LL sans TIC</option>
            <option value="AVGAS_100LL_plus_TIC">AVGAS 100LL + TIC</option>
        </select>
        <label for="qtt_essence">Quantité (L): </label>
        <input type="number" id="qtt_essence">
        <button type="button" id="addEssence">Add</button>
    </form>
    <form hidden id="parking">
        <label for="startParkingDate">Date arrivée: </label>
        <input type="date" id="startParkingDate">
        <label for="endParkingDate">Date départ: </label>
        <input type="date" id="endParkingDate">
        <label for="parkingLongueur">Longueur de l'avion (m): </label>
        <input type="number" id="parkingLongueur">
        <label for="parkingEnvergure">Envergure de l'avion (m): </label>
        <input type="number" id="parkingEnvergure">
        <label for="parkingMasse">Masse maximum au décollage (T): </label>
        <input type="number", id="parkingMasse">
        <label for="basedParking">Avion basé: </label>
        <input type="checkbox", id="basedParking">
        <button type="button" id="addParking">Add</button>
    </form>
    <form hidden id="oParking">
        <label for="startOParkingDate">Date arrivée: </label>
        <input type="date" id="startOParkingDate">
        <label for="nbWeekOParking">Nombre de semaines: </label>
        <input type="number" id="nbWeekOParking">
        <label for="oParkingLongueur">Longueur de l'avion (m): </label>
        <input type="number" id="oParkingLongueur">
        <label for="oParkingEnvergure">Envergure de l'avion (m): </label>
        <input type="number" id="oParkingEnvergure">
        <button type="button" id="addOParking">Add</button>
    </form>
</section>
</main>
<aside>
    <ul id="recapitulate">
        
    </ul>
    <div>
        <p>Total: <span id="total">0</span></p>
        <button type="button" id="pay">Pay</button>
    </div>
</aside>
</div>`;

export const htmlActivityLayout = `
<div class="stb-html-layout">
<form class="form-solo">
<select id="activitySelector">
    <option value="jump">Saut en parachute (300€)</option>
    <option value="wind">Baptême de l'air (200€)</option>
</select>
<input type="date" id="date">
<input type="time" id="hour">
<button type="button" id="joinActivity">S'inscrire</button>
</form>
</div>`;

export const htmlCourseLayout = `
<div class="stb-html-layout">
<form class="form-solo">
<select id="courseSelector">
            
</select>
<button type="button" id="joinCourse">Join</button>
</form>
</div>`;

export const htmlProfilLayout = ` <section id="user-header">
<div id="profile-infos">
    <div id="user-picture">

    </div>
    <div id="user-infos">
        <h2>John Doe</h2>
        <h4>Admin</h4>
    </div>
</div>
<nav>
    <ul>

    </ul>
</nav>
</section>`