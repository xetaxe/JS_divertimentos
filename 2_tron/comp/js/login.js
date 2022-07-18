var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function newUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = { "username": username };
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/login");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(newUser));
        xhttp.onload = function () {
            if (this.responseText === "exists") {
                return "User already exists";
            }
            else {
                // window.location.replace('/chat.html')
            }
        };
    });
}
