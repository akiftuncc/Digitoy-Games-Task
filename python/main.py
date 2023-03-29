def kullanici_input_to_values(i):
    i_val = i
    if i == 3:
        i_val += 1
    if kullanici_input_splitted[i] == "evet":
        kullanici_input_splitted[i] = i_val
    elif kullanici_input_splitted[i] == "hayır":
        kullanici_input_splitted[i] = 0
    else:
        print("Hatalı input")

class masa():
    def __init__(self, bahis, hiz, teketek, rovans):
        self.bahis = bahis
        self.hiz = hiz
        self.rovans = rovans
        self.teketek = teketek

    def masaOzellikleriChange(self):
        if self.hiz:
            self.hiz = "hızlı"
        else:
            self.hiz = "yavaş"

        if self.teketek:
            self.teketek= " teke tek"
        else:
            self.teketek= " çok oyunculu"

        if self.rovans:
            self.rovans = " rovanşlı"
        else:
            self.rovans = " rovanşsız"

    def masaPrint(self):
        print(f"Bahis: {self.bahis},{self.hiz},{self.teketek},{self.rovans} oyun")

masa_bitflag_listesi  = []
while True:
    print("\n***Çıkmak için tuşlayınız: 'Q' ")
    kullanici_input = input("Bahis miktarı / Hızlı mı(1) / Teke tek mi(2) / Rovanşlı mı(4) ?? \nSorularını örnekte belirtilen şekilde cevaplayınız\n örnek:1200-evet-hayır-evet\n Cevabınız:")
    if kullanici_input == "q" or kullanici_input == "Q":
        break
    kullanici_input_splitted = kullanici_input.split("-")

    bitflag_value = 0
    for i in range(1,4):
        kullanici_input_to_values(i)
        bitflag_value+=kullanici_input_splitted[i]

    kullanici_input_splitted[0] = int(kullanici_input_splitted[0])
    masa_bitflag_listesi.append([bitflag_value,kullanici_input_splitted[0]])

masa_class_listesi = []
for i,j in masa_bitflag_listesi:
    hiz_bool,teketek_bool,rovans_bool = False,False,False
    if i-4 >= 0:
        i-=4
        rovans_bool = True
    if i-2 >= 0:
        i-=2
        teketek_bool = True
    if i-1 >= 0:
        hiz_bool = True
    if j<200 or j>5000:
        print(f"{j} değerinde bahisle oluşturduğunuz masa oluşturulamıyor")
        continue
    masaX = masa(j,hiz_bool,teketek_bool,rovans_bool)
    masa_class_listesi.append(masaX)

masa_sayi = 0
for i in masa_class_listesi:
    masa_sayi+=1
    print(f"Masa {masa_sayi}:",end=" ")
    i.masaOzellikleriChange()
    i.masaPrint()
