export const htmlBookPlaneLayout = `<div>
<form>
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