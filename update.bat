@echo off
echo ====================================
echo 📦 A PUBLICAR PARA O GITHUB
echo ====================================
cd /d E:\1Websites\InstaPT

echo.
echo 📝 A verificar alterações...
git status

echo.
echo 📌 A adicionar ficheiros...
git add .

echo.
echo 💬 Escreve uma descrição da alteração:
set /p mensagem="> "

echo.
echo 📦 A fazer commit...
git commit -m "%mensagem%"

echo.
echo ☁️  A enviar para GitHub...
git push

echo.
echo ====================================
echo ✅ PUBLICADO COM SUCESSO!
echo 🌐 Site atualizado em 2-5 minutos
echo ====================================
pause